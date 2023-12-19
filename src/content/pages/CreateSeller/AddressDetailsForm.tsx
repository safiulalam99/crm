import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from 'src/components/Formik/FormikControl';
import ClearIcon from '@mui/icons-material/Clear';
import { postAddressDetails } from 'src/services/POST_SELLER_ADDRESS';
import useAddressDetail from 'src/services/GET_SELLERS_ADDRESS';
import { useDeleteAddressDetail } from 'src/services/DELETE_SELLER_ADDRESS';
import countriesList from '../../../Data/countries.json';

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
        label="Address"
        name="address"
        placeholder="123 Street, City"
        labelLayout="left"
        // labelRequired="true"
      />
    </Grid>
    <Grid item xs={12}>
      <FormikControl
        control="dropdown"
        type="text"
        label="Country"
        name="country"
        options={countriesList}
        labelLayout="left"
        // labelRequired="true"
      />{' '}
    </Grid>
  </Grid>
);

const BankDetailsForm = ({ user, seller_id, openSnackbar }) => {
  const [refetchTrigger, setRefetchTrigger] = React.useState(0);
  const { seller_addresses, refetch_address } = useAddressDetail();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [bankDetailIdToDelete, setBankDetailIdToDelete] = React.useState(null);
  console.log('seller_addresses', seller_addresses);
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
  const deleteBankDetailMutation = useDeleteAddressDetail();

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
    return seller_addresses?.map((detail, index) => (
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
            <Typography>Account Name: {detail?.address}</Typography>
            <Typography>IBAN: {detail?.country}</Typography>
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
                  sx={{ backgroundColor: 'green' }}
                  onClick={handleClickOpen}
                >
                  Add New Address
                </Button>
              </Box>
            </Grid>
            {renderBankDetailsCards()}
          </Grid>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle variant="h4">Add New Address</DialogTitle>
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
                const result = await postAddressDetails(
                  values,
                  user,
                  seller_id,
                  openSnackbar
                );
                if (result.success) {
                    refetch_address();
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
