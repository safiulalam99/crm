import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Box
} from '@mui/material';
import React from 'react';
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

const BankDetailsForm = ({
  tabValue,
  bankDetails,
  user,
  seller_id,
  openSnackbar
}) => {
  const [refetchTrigger, setRefetchTrigger] = React.useState(0);
  const { bank_details, refetch } = useBankDetail();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [bankDetailIdToDelete, setBankDetailIdToDelete] = React.useState(null);

  const handleDeleteDialogOpen = (bankDetailId) => {
    setBankDetailIdToDelete(bankDetailId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setBankDetailIdToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (bankDetailIdToDelete !== null) {
      handleDelete(bankDetailIdToDelete);
    }
    handleDeleteDialogClose();
  };

  // Instantiate the hook and extract the mutate function
  const deleteBankDetailMutation = useDeleteBankDetail();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Create a handleDelete function
  const handleDelete = (bankDetailId) => {
    // Call the mutate function with the bankDetailId
    deleteBankDetailMutation.mutate(bankDetailId);
  };

  const renderBankDetailsCards = () => {
    return bank_details?.map((detail, index) => (
      <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
        <Card
          sx={{
            mb: 2,
            maxWidth: 500,
            mx: 'auto',
            borderRadius: 2,
            boxShadow: 1,
            position: 'relative' // Add this line
          }}
          variant="outlined"
        >
          <Button
            onClick={() => handleDeleteDialogOpen(detail.id)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'red',
              borderRadius: 100
            }}
          >
            <ClearIcon />
          </Button>
          <CardContent
            sx={{
              textAlign: 'left',
              paddingTop: '48px' // Added padding-top to prevent overlap with the button
            }}
          >
            <Typography fontWeight={3} variant="h6" sx={{ mb: 0.1 }}>
              <strong> Bank: {detail?.accountname}</strong>
            </Typography>
            <Typography>Account Name: {detail?.bank}</Typography>
            <Typography>IBAN: {detail?.iban}</Typography>
            <Typography>BIC: {detail?.bic}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      <>
          <Box
            sx={{
              //   backgroundColor: 'blue',
              padding: '10px',
              borderRadius: '6px',
              boxShadow: 1,
              width: '100%'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'primary' }}
                    onClick={handleClickOpen}
                  >
                    New Bank Account
                  </Button>
                </Box>
              </Grid>
              {renderBankDetailsCards()}
              <Grid item xs={12}>
                {/* <Box sx={{ flexGrow: 1 }}>
                  <BankInputForm />
                </Box> */}
              </Grid>
            </Grid>
          </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle variant="h4">Create New Bank Account</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                bankaccountname: '',
                iban: '',
                bankname: '',
                bankbic: ''
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const result = await postBankDetails(
                  values,
                  user,
                  seller_id,
                  openSnackbar
                );
                if (result.success) {
                  refetch();
                  handleClose();
                }
              }}
            >
              {() => (
                <Form>
                  <BankInputForm />

                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this bank detail?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};

export default BankDetailsForm;
