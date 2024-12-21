import React, { useEffect, useState, useContext } from 'react';
import { Document, PDFViewer } from '@react-pdf/renderer';
import { 
  Card, 
  CardContent,
  CardMedia, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Drawer,
  Box,
  IconButton,
  styled,
  Grid,
  Button,
  Dialog,
  DialogActions,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import PDF from './Document';
import './index.css';
import { getInvoiceData } from 'src/services/GET_proforma_preview';
import { useSignatures } from 'src/services/GET_signatures';
import { useParams } from 'react-router-dom';
import { UserContext } from 'src/contexts/UserContext';
import SignatureManagement from 'src/components/Signature/SignatureManagement';
import { updateProformaSignature } from 'src/services/UPDATE_proforma_signature';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2]
}));

const SignatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between'
}));

const ProformaInvoice = () => {
  const [sample_data, setSample_data] = useState(null);
  const [isSignatureEnabled, setIsSignatureEnabled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isDisableConfirmOpen, setIsDisableConfirmOpen] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const { data: signatures, isLoading: signaturesLoading } = useSignatures(user?.id);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInvoiceData(id);
        setSample_data(data[0]);
        
        if (data[0]?.signature_id && signatures) {
          const existingSignature = signatures.find(
            (sig) => sig.id === data[0].signature_id
          );
          if (existingSignature) {
            setSelectedSignature(existingSignature);
            setIsSignatureEnabled(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    }

    fetchData();
  }, [id, signatures]);

  const handleSignatureToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsSignatureEnabled(true);
      setIsDrawerOpen(true);
    } else {
      setIsDisableConfirmOpen(true);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    if (!selectedSignature) {
      setIsSignatureEnabled(false);
    }
  };

  const handleSignatureSelect = async (signature) => {
    setSelectedSignature(signature);
    setIsConfirmationOpen(true);
  };

  const handleConfirmSignature = async () => {
    if (!selectedSignature || !id) return;

    setIsUpdating(true);
    setUpdateError(null);

    try {
      await updateProformaSignature(id, selectedSignature.id);
      setIsDrawerOpen(false);
      setIsConfirmationOpen(false);
      setIsSignatureEnabled(true);
      const data = await getInvoiceData(id);
      setSample_data(data[0]);
    } catch (error) {
      setUpdateError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDisableSignature = async () => {
    if (!id) return;
    
    setIsDisabling(true);
    try {
      await updateProformaSignature(id, null);
      setIsSignatureEnabled(false);
      setSelectedSignature(null);
      const data = await getInvoiceData(id);
      setSample_data(data[0]);
    } catch (error) {
      console.error('Error disabling signature:', error);
    } finally {
      setIsDisabling(false);
      setIsDisableConfirmOpen(false);
    }
  };

  return (
    <div className="container">
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Proforma Invoice Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isSignatureEnabled}
                onChange={handleSignatureToggle}
                color="primary"
              />
            }
            label="Enable Digital Signature"
          />
        </CardContent>
      </StyledCard>

      <div className="pdf-viewer">
        <PDFViewer showToolbar={true} className="viewer">
          <Document>
            <PDF sample_data={sample_data} />
          </Document>
        </PDFViewer>
      </div>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '600px',
            padding: 2
          }
        }}
      >
        <DrawerHeader>
          <Typography variant="h6">Select Signature</Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsManagementOpen(true)}
            >
              Create New Signature
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {signatures?.map((signature) => (
              <Grid item xs={12} sm={6} key={signature.id}>
                <SignatureCard 
                  onClick={() => handleSignatureSelect(signature)}
                  sx={{
                    border: (theme) =>
                      selectedSignature?.id === signature.id
                        ? `2px solid ${theme.palette.primary.main}`
                        : 'none'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={signature.image}
                    alt={signature.name}
                    sx={{
                      objectFit: 'contain',
                      bgcolor: 'grey.100',
                      p: 2
                    }}
                  />
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {signature.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {signature.email}
                        </Typography>
                      </Box>
                      {selectedSignature?.id === signature.id && (
                        <Box
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem'
                          }}
                        >
                          Selected
                        </Box>
                      )}
                    </Box>
                    {signature.is_default && (
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ display: 'block', mt: 1 }}
                      >
                        Default Signature
                      </Typography>
                    )}
                  </CardContent>
                </SignatureCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Drawer>

      <Dialog
        open={isManagementOpen}
        onClose={() => setIsManagementOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogHeader>
          <Typography variant="h6">Manage Signatures</Typography>
          <IconButton onClick={() => setIsManagementOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <Box sx={{ p: 2 }}>
          <SignatureManagement 
            userId={user?.id} 
            onSelectSignature={(signature) => {
              handleSignatureSelect(signature);
              setIsManagementOpen(false);
            }}
          />
        </Box>
      </Dialog>

      <Dialog
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogHeader>
          <Typography variant="h6">Confirm Signature Selection</Typography>
          <IconButton onClick={() => setIsConfirmationOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <Box sx={{ p: 3 }}>
          <Typography gutterBottom>
            Are you sure you want to add this signature to the Proforma Invoice?
          </Typography>
          
          {selectedSignature && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={selectedSignature.image}
                  alt="Selected Signature"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100px',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                {selectedSignature.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedSignature.email}
              </Typography>
            </Box>
          )}

          {updateError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {updateError}
            </Typography>
          )}
        </Box>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setIsConfirmationOpen(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmSignature}
            disabled={isUpdating}
            sx={{ minWidth: 100 }}
          >
            {isUpdating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDisableConfirmOpen}
        onClose={() => setIsDisableConfirmOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogHeader>
          <Typography variant="h6">Disable Signature</Typography>
          <IconButton onClick={() => setIsDisableConfirmOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <Box sx={{ p: 3 }}>
          <Typography gutterBottom>
            Are you sure you want to remove the signature from this Proforma Invoice?
          </Typography>
          {selectedSignature && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={selectedSignature.image}
                  alt="Current Signature"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100px',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                {selectedSignature.name}
              </Typography>
            </Box>
          )}
        </Box>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setIsDisableConfirmOpen(false)}
            disabled={isDisabling}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDisableSignature}
            disabled={isDisabling}
            sx={{ minWidth: 100 }}
          >
            {isDisabling ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Remove Signature'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DialogHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

export default ProformaInvoice;
