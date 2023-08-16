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

const initialValues = {
  name: '',
  address: '',
  country: '',
  vatnumber: '',
  contractnumber: '',
  representative: '',
  paymentterm: '',
  deliveryterm: '',
  currency: '',
  registrationnumber: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  vatnumber: Yup.string(),
  contractnumber: Yup.string(),
  representative: Yup.string(),
  paymentterm: Yup.string(),
  deliveryterm: Yup.string(),
  currency: Yup.string().required('Required'),
  registrationnumber: Yup.string()
});

const CreateCustomerForm = () => {
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
          onSubmit={(values, actions) => onSubmitCustomer(values, actions)}
        >
          {(formik) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Name"
                    name="name"
                    placeholder="John Doe"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Address"
                    name="address"
                    placeholder="123 Street, City"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="dropdown"
                    type="text"
                    label="Country"
                    name="country"
                    options={countriesList}
                  />{' '}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Tooltip title="VAT Number for the customer's country">
                    <FormikControl
                      control="input"
                      label="VAT Number"
                      name="vatnumber"
                      placeholder="XX12345678"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Contract Number"
                    name="contractnumber"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Representative"
                    name="representative"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Payment Term"
                    name="paymentterm"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Delivery Term"
                    name="deliveryterm"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormikControl
                    control="dropdown"
                    type="text"
                    label="Currency"
                    name="currency"
                    options={currencyList}
                  />{' '}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="input"
                    label="Registration Number"
                    name="registrationnumber"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid}
                  >
                    Create Customer
                  </Button>
                </Grid>
              </Grid>
            <pre>{JSON.stringify(formik.values, null, 2)}</pre>

            </Form>
          )}
          
        </Formik>
      </Container>
    </Container>
  );
};

export default CreateCustomerForm;
