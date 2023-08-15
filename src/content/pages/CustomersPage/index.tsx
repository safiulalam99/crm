import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box } from '@mui/material';
import FormikControl from '../../../components/Formik/FormikControl'; // Assuming this is the correct path
import { onSubmitCustomer } from '../../../services/POST_customers';

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
    <>
      <Container>
        <Box m={2}></Box>
        <h1>Create Customer</h1>
        &nbsp;
        <Container style={{ background: 'white' }} maxWidth="lg">
          <Container maxWidth="lg">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitCustomer}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={2}>
                    <FormikControl control="input" label="Name" name="name" />
                    <FormikControl
                      control="input"
                      label="Address"
                      name="address"
                    />
                    <FormikControl
                      control="input"
                      label="Country"
                      name="country"
                    />
                    <FormikControl
                      control="input"
                      label="VAT Number"
                      name="vatnumber"
                    />
                    <FormikControl
                      control="input"
                      label="Contract Number"
                      name="contractnumber"
                    />
                    <FormikControl
                      control="input"
                      label="Representative"
                      name="representative"
                    />
                    <FormikControl
                      control="input"
                      label="Payment Term"
                      name="paymentterm"
                    />
                    <FormikControl
                      control="input"
                      label="Delivery Term"
                      name="deliveryterm"
                    />
                    <FormikControl
                      control="input"
                      label="Currency"
                      name="currency"
                    />
                    <FormikControl
                      control="input"
                      label="Registration Number"
                      name="registrationnumber"
                    />
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Create Customer
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default CreateCustomerForm;
