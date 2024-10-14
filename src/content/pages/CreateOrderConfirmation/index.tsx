import { useEffect, useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box, Paper, Drawer, Typography, FormControlLabel, Switch } from '@mui/material';
import { INITIAL_VALUES, validationSchema } from '../../../utils/utils';

import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'src/contexts/SnackbarContext';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';
import Header from './Header';
import BuyerandSellerOptions from './BuyerandSellerOptions';
import { onSubmitInvoice } from 'src/services/POST_orderconfirmation';
import FormikControl from 'src/components/Formik/FormikControl';
import AddProductsTable from './AddProductsTable';
import SignatureManagement from 'src/components/Signature/SignatureManagement';
import supabase from 'src/config/supabaseClient';
import { useQuery } from '@tanstack/react-query';

const SignatureUpdater = ({ selectedSignature }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (selectedSignature) {
      setFieldValue('signatureId', selectedSignature.id);
    } else {
      setFieldValue('signatureId', null);
    }
  }, [selectedSignature, setFieldValue]);

  return null;
};

function CreateOrderConfirmation() {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [user, setUser] = useState('');
  const [includeSignature, setIncludeSignature] = useState(false);
  const [signatureDrawerOpen, setSignatureDrawerOpen] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getLoggedInUserDetails();
      if (userDetails) {
        setUser(userDetails?.id);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchSignatures = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('signatures')
      .select('*')
      .eq('user_id', user)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  };

  const { data: signatures, refetch: refetchSignatures } = useQuery(['signatures', user], fetchSignatures, {
    enabled: !!user
  });

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSignatureDrawerOpen(open);
    if (open) {
      refetchSignatures();
    }
  };

  const handleIncludeSignatureChange = (e, formik) => {
    const isChecked = e.target.checked;
    setIncludeSignature(isChecked);
    formik.setFieldValue('includeSignature', isChecked);
    if (isChecked && !selectedSignature) {
      toggleDrawer(true)({ type: 'click' }); // Call the function returned by toggleDrawer with a mock event
    } else if (!isChecked) {
      setSelectedSignature(null);
      formik.setFieldValue('signatureId', null);
    }
  };

  const handleSignatureSelect = (signature) => {
    setSelectedSignature(signature);
    setSignatureDrawerOpen(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Order Confirmation
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={validationSchema}
              onSubmit={(values, actions) =>
                onSubmitInvoice(values, actions, navigate, openSnackbar, user)
              }
            >
              {(formik) => (
                <Form>
                  <SignatureUpdater selectedSignature={selectedSignature} />
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Header />
                    </Grid>
                    <Grid item xs={12}>
                      <BuyerandSellerOptions setFieldValue={formik.setFieldValue} />
                    </Grid>
                    <Grid item xs={12}>
                      <AddProductsTable values={formik.values?.products} name="products" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormikControl
                        control="input"
                        label="Notes"
                        name="comments"
                        multiline
                        InputProps={{ rows: 5 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormikControl
                            control="input"
                            type="number"
                            label="Tax(%)"
                            name="taxRate"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormikControl
                            control="input"
                            type="number"
                            label="Discount(%)"
                            name="discountRate"
                          />
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2 }}>
                        <Typography>Sub Total: {formik.values.subTotal}</Typography>
                        <Typography>Tax: {formik.values.totalTax}</Typography>
                        <Typography>Discount: {formik.values.totalDiscount}</Typography>
                        <Typography variant="h6">Total: {formik.values.total}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ mt: 2, mb: 2 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={includeSignature}
                              onChange={(e) => handleIncludeSignatureChange(e, formik)}
                            />
                          }
                          label="Include Signature"
                        />
                        {includeSignature && selectedSignature && (
                          <Button
                            variant="outlined"
                            onClick={toggleDrawer(true)}
                            sx={{ ml: 2 }}
                          >
                            Change Signature
                          </Button>
                        )}
                      </Box>
                      {includeSignature && selectedSignature && (
                        <Paper elevation={2} sx={{ p: 2, maxWidth: 300, mb: 2 }}>
                          <Typography variant="subtitle1">Selected Signature:</Typography>
                          <Typography variant="body1">{selectedSignature.name}</Typography>
                          <Box sx={{
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            mt: 1
                          }}>
                            <img
                              src={selectedSignature.image}
                              alt="Selected Signature"
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                              }}
                            />
                          </Box>
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" size="large">
                        Submit Order Confirmation
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Container>
      <Drawer
        anchor="right"
        open={signatureDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            width: '70%'
          }
        }}
      >
        <SignatureManagement 
          userId={user}
          onSelectSignature={handleSignatureSelect}
        />
      </Drawer>
    </>
  );
}

export default CreateOrderConfirmation;