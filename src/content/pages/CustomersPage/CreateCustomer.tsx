import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Container,
  Button,
  Box,
  Typography,
  Tooltip
} from '@mui/material';
import FormikControl from '../../../components/Formik/FormikControl'; // Assuming this is the correct path
import { onSubmitCustomer } from '../../../services/POST_customers';
import countriesList from '../../../Data/countries.json';
import currencyList from '../../../Data/currency.json';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'src/contexts/SnackbarContext';

const initialValues = {
  name: '',
  address: '',
  country: '',
  vatnumber: '',
  contractnumber: '',
  contactperson: '',
  contactpersonrole: '',
  paymentterm: '',
  deliveryterm: '',
  currency: 1,
  registrationnumber: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  vatnumber: Yup.string(),
  contractnumber: Yup.string(),
  contactperson: Yup.string(),
  contactpersonrole: Yup.string(),
  paymentterm: Yup.string(),
  deliveryterm: Yup.string(),
  currency: Yup.string().required('Required'),
  registrationnumber: Yup.string()
});


const CreateCustomerForm = () => {
  const navigate = useNavigate();
const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" gutterBottom>
          Create Customer
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        style={{ background: 'white', padding: '24px', borderRadius: '8px' }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => onSubmitCustomer(values, actions, navigate, openSnackbar )}
        >
          {(formik) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Name"
                    name="name"
                    placeholder="John Doe"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Address"
                    name="address"
                    placeholder="123 Street, City"
                    labelLayout="left"
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
                  />{' '}
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="VAT Number for the customer's country">
                    <FormikControl
                      control="input"
                      label="VAT Number"
                      name="vatnumber"
                      placeholder="XX12345678"
                      labelLayout="left"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Contract Number"
                    name="contractnumber"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Contact Person"
                    name="contactperson"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Contact Person Role"
                    name="contactpersonrole"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Payment Term"
                    name="paymentterm"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Delivery Term"
                    name="deliveryterm"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="dropdown"
                    type="text"
                    label="Currency"
                    name="currency"
                    options={currencyList}
                    labelLayout="left"
                  />{' '}
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    control="input"
                    label="Registration Number"
                    name="registrationnumber"
                    labelLayout="left"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid}
                    style={{ float: 'right', marginTop: '20px' }}
                  >
                    Create Customer
                  </Button>
                </Grid>
              </Grid>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
};

export default CreateCustomerForm;
