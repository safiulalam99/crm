import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid
} from '@mui/material';
import FormikControl from 'src/components/Formik/FormikControl';
import countriesList from '../../../Data/countries.json';

const ConfirmPrimaryAddressDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set as Primary Address</DialogTitle>
      <DialogContent>
        Are you sure you want to set this address as your primary address?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  const AddressInputForm = () => (
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
  

export  {ConfirmPrimaryAddressDialog, AddressInputForm};
