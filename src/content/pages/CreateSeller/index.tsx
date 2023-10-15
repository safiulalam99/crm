import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Container,
  Button,
  Box,
  Typography,
  Tooltip,
  Tabs,
  Tab,
  Divider
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
import TabPanel from 'src/components/TabPanel';
import useBankDetails from 'src/services/GET';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  vatnumber: Yup.string(),
  managingdirector: Yup.string(),
  displayname: Yup.string(),
  bankaccountname: Yup.string(),
  iban: Yup.string(),
  bankname: Yup.string(),
  bankbic: Yup.string()
});

const CreateSeller = ({ refreshSellers, handleCloseSellerDrawer }) => { 
  const navigate = useNavigate();
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();
  const [user, setUser] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    sellers,
    error: sellerError,
    isLoading: sellerLoading
  } = useSellers();
  const seller_id = sellers?.[0].id || null;

  // Get the bank details for the specified seller
  const { bankDetails, error: bankDetailsError, isLoading: bankDetailsLoading } = useBankDetails();

  const initialValues = {
    id: sellers?.[0].id || '',
    name: sellers?.[0].name || '',
    address: sellers?.[0].address || '',
    country: sellers?.[0].country || '',
    vatnumber: sellers?.[0].vatnumber || '',
    managingdirector: sellers?.[0].managingdirector || '',
    displayname: sellers?.[0]?.displayname || '',
    bankaccountname: bankDetails?.[0]?.accountname || '',
    iban: bankDetails?.[0]?.iban || '',
    bankname: bankDetails?.[0]?.bank || '',
    bankbic: bankDetails?.[0]?.bic || ''
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
  const handleSubmit = (values, actions) => {
    onUpdateSeller(values, actions, openSnackbar, user, refreshSellers)
      .then(response => {
        if (response.success) {
          handleCloseSellerDrawer();  // Call the function to close the drawer
        }
      });
  };


  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit} 

      >
        {(formik) => (
          <>
            <Form>
              <Box
                mt={4}
                mb={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4" gutterBottom>
                  Edit Company Details
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // disabled={!formik.isValid}
                >
                  Update
                </Button>
              </Box>

              <Container
                maxWidth="md"
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '8px'
                }}
              >
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab  label="Details" />
                  <Tab label="Bank Details" />
                </Tabs>
                <Divider />
                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormikControl
                        control="input"
                        label="Name"
                        name="name"
                        placeholder=""
                        labelLayout="left"
                        labelRequired="true"

                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikControl
                        control="input"
                        label="Address"
                        name="address"
                        placeholder="123 Street, City"
                        labelLayout="left"
                        labelRequired="true"

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
                        labelRequired="true"

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
                  </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
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
                </TabPanel>
              </Container>
            </Form>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default CreateSeller;
