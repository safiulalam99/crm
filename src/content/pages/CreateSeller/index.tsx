import React, { useEffect, useState } from 'react';
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
import FormikControl from '../../../components/Formik/FormikControl';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';
import useSellers from 'src/services/GET_seller_data';
import { onUpdateSeller } from 'src/services/UPDATE';
import TabPanel from 'src/components/TabPanel';
import useBankDetails from 'src/services/GET';
import BankDetailsForm from './BankDetailsForm';
import AddressDetailsForm from './AddressDetailsForm';
import SignatureManagement from 'src/components/Signature/SignatureManagement';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  vatnumber: Yup.string(),
  managingdirector: Yup.string(),
  displayname: Yup.string(),
});

interface CreateSellerProps {
  refreshSellers: () => void;
  handleCloseSellerDrawer: () => void;
}

const CreateSeller: React.FC<CreateSellerProps> = ({ refreshSellers, handleCloseSellerDrawer }) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [user, setUser] = useState<string>('');
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const { sellers } = useSellers();
  const seller_id = sellers?.[0]?.id || null;

  const { bankDetails } = useBankDetails();

  const initialValues = {
    id: sellers?.[0]?.id || '',
    name: sellers?.[0]?.name || '',
    address: sellers?.[0]?.address || '',
    country: sellers?.[0]?.country || '',
    vatnumber: sellers?.[0]?.vatnumber || '',
    managingdirector: sellers?.[0]?.managingdirector || '',
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

  const handleSubmit = (values: typeof initialValues, actions: any) => {
    onUpdateSeller(values, actions, openSnackbar, user, refreshSellers).then(
      (response) => {
        if (response.success) {
          handleCloseSellerDrawer();
        }
      }
    );
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
                <Tab label="Details" />
                <Tab label="Address" />
                <Tab label="Bank Details" />
                <Tab label="Signatures" />
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
                <AddressDetailsForm
                  seller_id={seller_id}
                  openSnackbar={openSnackbar}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <BankDetailsForm
                  seller_id={seller_id}
                  openSnackbar={openSnackbar}
                  user={user}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
              <SignatureManagement userId={user}  />
              </TabPanel>
            </Container>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateSeller;