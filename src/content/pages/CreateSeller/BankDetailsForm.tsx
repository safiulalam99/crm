import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Stack
} from '@mui/material';
import React, { useState } from 'react';
import FormikControl from 'src/components/Formik/FormikControl';
import TabPanel from 'src/components/TabPanel';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { postBankDetails } from 'src/services/POST_BANK_DETAILS';
import useBankDetail from 'src/services/GET_BANK_DETAILS';
import { useDeleteBankDetail } from 'src/services/DELETE_BANK_DETAILS';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
const validationSchema = Yup.object({
  bankaccountname: Yup.string(),
  iban: Yup.string(),
  bankname: Yup.string(),
  bankbic: Yup.string()
});

const BankInputForm = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <FormikControl
        control="input"
        label="Account Name"
        name="bankaccountname"
        labelLayout="left"
      />
    </Grid>
    <Grid item xs={12}>
      <FormikControl
        control="input"
        label="IBAN"
        name="iban"
        labelLayout="left"
      />
    </Grid>
    <Grid item xs={12}>
      <FormikControl
        control="input"
        label="Bank"
        name="bankname"
        labelLayout="left"
      />
    </Grid>
    <Grid item xs={12}>
      <FormikControl
        control="input"
        label="BIC"
        name="bankbic"
        labelLayout="left"
      />
    </Grid>
  </Grid>
);

const BankDetailCard = ({ detail, onDelete }) => (
  <Card sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'space-between' }}>
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {detail?.accountname}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Bank: {detail?.bank}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        IBAN: {detail?.iban}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        BIC/SWIFT: {detail?.bic}
      </Typography>
    </Box>
    <IconButton onClick={onDelete} color="error" size="large">
      <CloseIcon />
    </IconButton>
  </Card>
);

// Main component to display and manage bank details
const BankDetailsForm = ({ user, seller_id, openSnackbar }) => {
  const { bank_details, refetch } = useBankDetail();
  const deleteBankDetailMutation = useDeleteBankDetail();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bankDetailIdToDelete, setBankDetailIdToDelete] = useState(null);

  const handleDelete = (bankDetailId) => {
    deleteBankDetailMutation.mutate(bankDetailId, {
      onSuccess: () => {
        openSnackbar('Bank detail successfully deleted.', 'success');
        setDeleteDialogOpen(false); // Close the dialog upon successful deletion
        refetch();
      },
      onError: (error) => {
        openSnackbar(`Error: ${error}`, 'error');
        setDeleteDialogOpen(false); // Close the dialog if there's an error
      }
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setBankDetailIdToDelete(null); // Reset the bank detail id to delete
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: 1, overflowY: 'auto' }}>
      <Stack spacing={2} mb={2}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          New Bank Account
        </Button>

        {bank_details?.map((detail, index) => (
          <BankDetailCard
            key={index}
            detail={detail}
            onDelete={() => {
              setBankDetailIdToDelete(detail.id);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
      </Stack>

      {/* Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Bank Account</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              bankaccountname: '',
              iban: '',
              bankname: '',
              bankbic: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              postBankDetails(values, user, seller_id, openSnackbar).then(
                () => {
                  actions.setSubmitting(false);
                  setOpen(false);
                  refetch();
                }
              );
            }}
          >
            {(formikProps) => (
              <Form>
                <BankInputForm />
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={formikProps.isSubmitting}>
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this bank detail?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => handleDelete(bankDetailIdToDelete)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BankDetailsForm;
