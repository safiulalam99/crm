import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import supabase from 'src/config/supabaseClient';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface Signature {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  image: string;
  is_default: boolean;
  created_at: string;
}

interface SignatureManagementProps {
  userId: string;
  onSelectSignature?: (signature: Signature) => void;
  allowSetDefault?: boolean;
}

export default function Component({
  userId,
  onSelectSignature,
  allowSetDefault
}: SignatureManagementProps) {
  const [open, setOpen] = useState(false);
  const [editingSignature, setEditingSignature] = useState<Signature | null>(
    null
  );
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [signatureToDelete, setSignatureToDelete] = useState<string | null>(
    null
  );
  const [currentSignature, setCurrentSignature] = useState<Partial<Signature>>({
    name: '',
    email: '',
    is_default: false,
    image: ''
  });
  const [signatureMethod, setSignatureMethod] = useState<
    'upload' | 'draw' | 'type'
  >('upload');
  const [typedSignature, setTypedSignature] = useState('');
  const queryClient = useQueryClient();
  const signatureRef = useRef<SignatureCanvas>(null);
  const [setDefaultDialogOpen, setSetDefaultDialogOpen] = useState(false);
  const [signatureToSetDefault, setSignatureToSetDefault] =
    useState<Signature | null>(null);

  const fetchSignatures = async (): Promise<Signature[]> => {
    const { data, error } = await supabase
      .from('signatures')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  };

  const {
    data: signatures,
    isLoading,
    error
  } = useQuery(['signatures', userId], fetchSignatures);

  const addOrUpdateSignatureMutation = useMutation(
    async (signature: Partial<Signature>) => {
      if (signature.id) {
        const { data, error } = await supabase
          .from('signatures')
          .update(signature)
          .eq('id', signature.id);
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('signatures')
          .insert([signature]);
        if (error) throw error;
        if (!data) throw new Error('No data returned');
        return data[0];
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['signatures', userId]);
      }
    }
  );

  const deleteSignatureMutation = useMutation(
    async (signatureId: string) => {
      const { data, error } = await supabase
        .from('signatures')
        .delete()
        .eq('id', signatureId);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['signatures', userId]);
        setDeleteConfirmOpen(false);
        setSignatureToDelete(null);
      }
    }
  );

  const setDefaultSignatureMutation = useMutation(
    async (signatureId: string) => {
      // First, unset all default signatures for this user
      await supabase
        .from('signatures')
        .update({ is_default: false })
        .eq('user_id', userId);

      // Then set the selected signature as default
      const { data, error } = await supabase
        .from('signatures')
        .update({ is_default: true })
        .eq('id', signatureId);

      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['signatures', userId]);
      }
    }
  );

  const handleSelectSignature = (signature: Signature) => {
    if (allowSetDefault) {
      setSignatureToSetDefault(signature);
      setSetDefaultDialogOpen(true);
    } else if (onSelectSignature) {
      onSelectSignature(signature);
    }
  };

  const handleSaveSignature = async () => {
    let signatureData = '';
    if (signatureMethod === 'draw' && signatureRef.current) {
      signatureData = signatureRef.current.toDataURL();
    } else if (signatureMethod === 'upload') {
      signatureData = currentSignature.image || '';
    } else if (signatureMethod === 'type') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '30px Brush Script MT, cursive';
        ctx.fillStyle = '#000000';
        ctx.fillText(typedSignature, 10, 50);
        signatureData = canvas.toDataURL();
      }
    }

    try {
      if (currentSignature.is_default) {
        // Unset any existing default signature for this user
        await supabase
          .from('signatures')
          .update({ is_default: false })
          .eq('user_id', userId);
      }

      const signatureToSave = {
        ...currentSignature,
        image: signatureData,
        user_id: userId
      };

      if (editingSignature) {
        const { data, error } = await supabase
          .from('signatures')
          .update(signatureToSave)
          .eq('id', editingSignature.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('signatures')
          .insert([signatureToSave]);
        if (error) throw error;
      }

      queryClient.invalidateQueries(['signatures', userId]);
      setOpen(false);
      clearForm();
    } catch (error) {
      console.error('Error saving signature:', error);
      // Show an error message to the user
    }
  };

  const handleEditSignature = (signature: Signature) => {
    setEditingSignature(signature);
    setCurrentSignature(signature);
    setOpen(true);
  };

  const handleDeleteSignature = (signatureId: string) => {
    setSignatureToDelete(signatureId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (signatureToDelete) {
      deleteSignatureMutation.mutate(signatureToDelete);
    }
  };

  const handleSetDefaultSignature = async (signatureId: string) => {
    try {
      await setDefaultSignatureMutation.mutateAsync(signatureId);
    } catch (error) {
      console.error('Error setting default signature:', error);
      // Show an error message to the user
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentSignature({
          ...currentSignature,
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    },
    [currentSignature]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clearForm = () => {
    setCurrentSignature({ name: '', email: '', is_default: false });
    setTypedSignature('');
    setEditingSignature(null);
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  useEffect(() => {
    if (signatures && signatures.length === 1) {
      handleSelectSignature(signatures[0]);
    }
  }, [signatures]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {(error as Error).message}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Manage Signatures
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          Add New Signature
        </Button>
      </Box>
      <Grid container spacing={3}>
        {signatures?.map((signature) => (
          <Grid item xs={12} sm={6} md={4} key={signature.id}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                },
                border: (theme) =>
                  `2px solid ${
                    signature.is_default
                      ? theme.palette.primary.main
                      : 'transparent'
                  }`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => handleSelectSignature(signature)}
            >
              <Box
                sx={{
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1
                }}
              >
                <img
                  src={signature.image}
                  alt="Signature"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                noWrap
                title={signature.name}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%'
                }}
              >
                {signature.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                title={signature.email || ''}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  mb: 1
                }}
              >
                {signature.email}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 'auto'
                }}
              >
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSignature(signature);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSignature(signature.id);
                    }}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog
  open={setDefaultDialogOpen}
  onClose={() => setSetDefaultDialogOpen(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle>Set Default Signature</DialogTitle>
  <DialogContent>
    <Typography gutterBottom>
      Do you want to set this signature as the default?
    </Typography>
    {signatureToSetDefault && (
      <Box
        sx={{
          mt: 2,
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <img
          src={signatureToSetDefault.image}
          alt="Signature Preview"
          style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
        />
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setSetDefaultDialogOpen(false)}>Cancel</Button>
    <Button
      onClick={() => {
        if (signatureToSetDefault) {
          handleSetDefaultSignature(signatureToSetDefault.id);
        }
        setSetDefaultDialogOpen(false);
      }}
      variant="contained"
      color="primary"
    >
      Set as Default
    </Button>
  </DialogActions>
</Dialog>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {editingSignature ? 'Edit Signature' : 'Add New Signature'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="Name"
            value={currentSignature.name}
            onChange={(e) =>
              setCurrentSignature({ ...currentSignature, name: e.target.value })
            }
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Email"
            value={currentSignature.email}
            onChange={(e) =>
              setCurrentSignature({
                ...currentSignature,
                email: e.target.value
              })
            }
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <Tabs
            value={signatureMethod}
            onChange={(_, newValue) => setSignatureMethod(newValue)}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            <Tab label="Upload" value="upload" />
            <Tab label="Draw" value="draw" />
            <Tab label="Type" value="type" />
          </Tabs>
          {signatureMethod === 'draw' && (
            <Box
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mb: 1
              }}
            >
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 260,
                  height: 100,
                  className: 'signature-canvas'
                }}
                backgroundColor="white"
              />
              <Button
                variant="outlined"
                onClick={() => signatureRef.current?.clear()}
                size="small"
                sx={{ mt: 1 }}
              >
                Clear
              </Button>
            </Box>
          )}
          {signatureMethod === 'upload' && (
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body2">
                {isDragActive
                  ? 'Drop the file here'
                  : 'Drag & drop or click to select'}
              </Typography>
              {currentSignature.image && (
                <Box mt={1}>
                  <img
                    src={currentSignature.image}
                    alt="Uploaded Signature"
                    style={{ maxWidth: '100%', maxHeight: '100px' }}
                  />
                </Box>
              )}
            </Box>
          )}
          {signatureMethod === 'type' && (
            <TextField
              label="Type your signature"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              fullWidth
              margin="dense"
              variant="outlined"
              InputProps={{
                sx: { fontFamily: 'Brush Script MT, cursive', fontSize: '20px' }
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveSignature}
            variant="contained"
            color="primary"
          >
            {editingSignature ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Confirm Deletion
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this signature?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
}
