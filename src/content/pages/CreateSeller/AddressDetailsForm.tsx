import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { postAddressDetails } from 'src/services/POST_SELLER_ADDRESS';
import useAddressDetail from 'src/services/GET_SELLERS_ADDRESS';
import { useDeleteAddressDetail } from 'src/services/DELETE_SELLER_ADDRESS';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from 'src/config/supabaseClient';
import { UserContext } from 'src/contexts/UserContext';
import AddressDetailCard from './AddressDetailCard';
import {
  AddressInputForm,
  ConfirmPrimaryAddressDialog
} from './ConfirmPrimaryAddressDialog';
const validationSchema = Yup.object({
  bankaccountname: Yup.string(),
  iban: Yup.string(),
  bankname: Yup.string(),
  bankbic: Yup.string()
});

// Function to set the primary address
const setPrimaryAddress = async ({ sellerId, addressId }) => {
  const { data, error } = await supabase
    .from('sellers') 
    .update({ primary_address: addressId })
    .eq('user_id', sellerId);

  if (error) throw new Error(error.message);
  return data;
};

const AddressDetailsForm = ({ seller_id, openSnackbar }) => {
  const { seller_addresses, refetch_address } = useAddressDetail();
  const deleteAddressDetailMutation = useDeleteAddressDetail();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressDetailIdToDelete, setAddressDetailIdToDelete] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const queryClient = useQueryClient();
  const [confirmPrimaryOpen, setConfirmPrimaryOpen] = useState(false);
  const userContext = useContext(UserContext);
  const [pendingSelectedAddress, setPendingSelectedAddress] = useState(null);

  const { user } = userContext;


  const handleDelete = (addressDetailId) => {
    deleteAddressDetailMutation.mutate(addressDetailId, {
      onSuccess: () => {
        openSnackbar('Address successfully deleted.', 'success');
        refetch_address();
      },
      onError: (error) => {
        openSnackbar(`Error: ${error}`, 'error');
      }
    });
  };

  // Mutation to set the primary address
  const { mutate: updatePrimaryAddress, isLoading: isUpdating } = useMutation(
    setPrimaryAddress,
    {
      onSuccess: () => {
        openSnackbar('Primary address set successfully.', 'success');
        // Invalidate and refetch seller addresses to update the UI
        queryClient.invalidateQueries(['seller_addresses', seller_id]);
      },
      onError: (error) => {
        openSnackbar(`Error setting primary address: ${error}`, 'error');
      }
    }
  );

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setAddressDetailIdToDelete(null); // Reset the address detail id to delete
  };

  const handleSelectAddress = (address) => {
    setPendingSelectedAddress(address);
    setConfirmPrimaryOpen(true);
  };

  const handleSetPrimaryAddress = () => {
    if (pendingSelectedAddress) {
      updatePrimaryAddress({
        sellerId: user?.id,
        addressId: pendingSelectedAddress.id
      });
      setSelectedAddress(pendingSelectedAddress);
      setPendingSelectedAddress(null); // Reset the pending selection
    }
    setConfirmPrimaryOpen(false); // Close the confirmation dialog
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: 1, overflowY: 'auto' }}>
      <Stack spacing={2} mb={2}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          New Address
        </Button>

        {seller_addresses?.map((detail, index) => (
          <AddressDetailCard
            key={index}
            detail={detail}
            selected={selectedAddress?.id === detail.id}
            onSelect={() => handleSelectAddress(detail)}
            onDelete={() => {
              setAddressDetailIdToDelete(detail.id);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
      </Stack>

      {/* Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              address: '',
              country: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              postAddressDetails(
                values,
                user?.id,
                seller_id,
                openSnackbar
              ).then(() => {
                actions.setSubmitting(false);
                setOpen(false);
                refetch_address();
              });
            }}
          >
            {(formikProps) => (
              <Form>
                <AddressInputForm />
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
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this address?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(addressDetailIdToDelete);
              closeDeleteDialog(); // Also close the dialog after clicking delete
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmPrimaryAddressDialog
        open={confirmPrimaryOpen}
        onClose={() => setConfirmPrimaryOpen(false)}
        onConfirm={handleSetPrimaryAddress}
      />
    </Box>
  );
};

export default AddressDetailsForm;
