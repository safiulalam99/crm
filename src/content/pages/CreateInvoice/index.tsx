import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box, Paper } from '@mui/material';
import { INITIAL_VALUES, validationSchema } from '../../../utils/utils';

import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'src/contexts/SnackbarContext';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';
import Header from './Header';
import BuyerandSellerOptions from './BuyerandSellerOptions';
import { onSubmitInvoice } from 'src/services/POST_invoices';
import FormikControl from 'src/components/Formik/FormikControl';
import AddProductsTable from './AddProductsTable';

function CreateOrderConfirmation() {
  const navigate = useNavigate();
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();

  const [user, setUser] = useState('');
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
    <>
      <Container>
        <Box m={2}></Box>
        <h1>Create Invoice</h1>
        &nbsp;
        <Container style={{ background: 'white' }} maxWidth="lg">
          <Container maxWidth="lg">
            <Box sx={{ position: 'relative' }}>
              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={
                  (values, actions) =>
                    onSubmitInvoice(
                      values,
                      actions,
                      navigate,
                      openSnackbar,
                      user
                    ) 
                }
              >
                {(formik) => (
                  <Form>
                    <Grid container justifyContent={'center'} spacing={2}>
                      {/* <HeadeliveryDater1 /> */}
                      <Header />
                      <BuyerandSellerOptions
                        setFieldValue={formik.setFieldValue}
                      />
                      <Paper sx={{ width: '100%', marginTop: 2 }}>
                        <AddProductsTable
                          values={formik.values?.products}
                          name="products"
                        />
                      </Paper>
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} marginTop={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <FormikControl
                                control="input"
                                label={'Notes'}
                                name="comments"
                                multiline
                                InputProps={{
                                  rows: 5
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6} marginTop={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <FormikControl
                                control="input"
                                type="number"
                                label="Tax(%)"
                                name={`taxRate`}
                              />
                            </Grid>
                            <Grid>
                              <FormikControl
                                control="input"
                                type="number"
                                label="Discount(%)"
                                name={`discountRate`}
                              />
                            </Grid>
                            <Grid
                              container
                              spacing={2}
                              marginTop={1}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Grid>Sub Total:</Grid>
                                <Grid>Tax:</Grid>
                                <Grid>Discount:</Grid>
                                <Grid>Total:</Grid>
                              </Grid>
                              <Grid item>
                                <Grid>{formik.values.subTotal}</Grid>
                                <Grid>{formik.values.totalTax}</Grid>
                                <Grid>{formik.values.totalDiscount}</Grid>
                                <Grid>{formik.values.total}</Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    </Grid>
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </Grid>
                    <Grid sx={{ marginBottom: '32px' }}></Grid>

                    {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>{' '}
        </Container>
      </Container>
    </>
  );
}

export default CreateOrderConfirmation;
