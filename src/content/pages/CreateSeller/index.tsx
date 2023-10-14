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
import { useEffect, useState } from 'react';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';
import useSellers from 'src/services/GET_seller_data';
import clsx from 'clsx';
import { onUpdateSeller } from 'src/services/UPDATE';

const validationSchema = Yup.object({
  name: Yup.string(),
  address: Yup.string(),
  country: Yup.string(),
  vatnumber: Yup.string(),
  contractnumber: Yup.string(),
  managingdirector: Yup.string(),
  currency: Yup.string()
});

const CreateCustomerForm = () => {
  const navigate = useNavigate();
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();
  const [user, setUser] = useState('');

  const {
    sellers,
    error: sellerError,
    isLoading: sellerLoading
  } = useSellers();

  const initialValues = {
    id: sellers?.[0].id || '',
    name: sellers?.[0].name || '',
    address: sellers?.[0].address || '',
    country: sellers?.[0].country || '',
    vatnumber: sellers?.[0].vatnumber || '',
    managingdirector: sellers?.[0].managingdirector || ''
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getLoggedInUserDetails();
      if (userDetails) {
        setUser(userDetails?.id);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={
          (values, actions) =>
            onUpdateSeller(values, actions, openSnackbar, user) // Changed to onUpdateSeller
        }
      >
        {(formik) => (
          <>
            <Box mt={4} mb={2}>
              <Typography variant="h4" gutterBottom>
                Edit Company Details
              </Typography>
            </Box>
            <Container
              maxWidth="md"
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: '8px'
              }}
            >
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
                      label="Managing Director"
                      name="managingdirector"
                      labelLayout="left"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormikControl
                      control="input"
                      label="Display Name"
                      name="displayname"
                      labelLayout="left"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      // disabled={!formik.isValid}
                      style={{ float: 'right', marginTop: '20px' }}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
                {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
              </Form>
            </Container>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCustomerForm;
