import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box, Paper } from '@mui/material';
import FormikControl from './FormikControl';
import { INITIAL_VALUES, validationSchema } from '../../utils/utils';
import { Rowing } from '@mui/icons-material';
import Header1 from '../Header1';
import Header2 from '../Header2';
import FormikTable from './FormikTable';
import supabase from '../../config/supabaseClient.js';
import { useNavigate } from 'react-router-dom';

import { onSubmitInvoice } from '../../services/POST_orderconfirmation';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';



const FormikContainer = () => {
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
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative' }}>
        {' '}
        {/* Add this Box */}
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={
            (values, actions) =>
              onSubmitInvoice(values, actions, navigate, openSnackbar, user) // Step 3
          }
        >
          {(formik) => (
            <Form>
              <Grid container justifyContent={'center'} spacing={2}>
                {/* <HeadeliveryDater1 /> */}
                <Header1 />
                <Header2 setFieldValue={formik.setFieldValue} />
                <Paper sx={{ width: '100%', marginTop: 2 }}>
                  <FormikTable
                    values={formik.values?.products}
                    name="products"
                  />
                </Paper>
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6} marginTop={2}>
                      <Grid item  xs={12} sm={12} md={12} lg={12}>
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
                      <Grid item  xs={12} sm={12} md={12} lg={12}>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  
                >
                  Submit
                </Button>
              </Grid>
              <Grid sx={{marginBottom:"32px"}}></Grid>

              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default FormikContainer;
