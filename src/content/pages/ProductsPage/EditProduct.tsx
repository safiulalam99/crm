import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box, Typography } from '@mui/material';
import FormikControl from '../../../components/Formik/FormikControl';
import { onSubmitProduct } from '../../../services/POST_products'; // Update this to POST_products

import { useEffect, useState } from 'react';

import React from 'react';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import supabase from 'src/config/supabaseClient';
import { getLoggedInUserDetails, getUserInfo } from 'src/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { getproduct } from 'src/services/GET';

const URL = /^(http|https|www):\/\/[^ "]+$/;
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string(),
  category: Yup.string(),
  price: Yup.number(),
  defaultquantity: Yup.number(),
  maxquantity: Yup.number(),
  imageurl: Yup.string().matches(URL, 'Enter correct url!')
});

const CreateProductForm = () => {
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar(); // <-- Use useSnackbar
  const [user, setUser] = useState('');
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const initialValues = {
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    price: product?.price || 0,
    defaultquantity: product?.defaultquantity || 0,
    maxquantity: product?.maxquantity || 0,
    imageurl: product?.imageurl || ''
  };

  async function fetchData(id) {
    try {
      const data = await getproduct(id);
      setProduct(data[0]);
    } catch (error) {
      console.error('Failed to fetch invoice data:', error);
    }
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getLoggedInUserDetails();
      if (userDetails) {
        setUser(userDetails?.id);
      }
    };

    fetchUserDetails();
    fetchData(id);
  }, []);
  // console.log(product[0]);

  return (
    <Container>
      <Box mt={4} mb={2} style={{ background: 'none' }}>
        <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold' }}>
          Create Product
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        style={{ background: 'white', padding: '24px', borderRadius: '8px' }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, actions) =>
            onSubmitProduct(values, actions, openSnackbar, user)
          }
        >
          {(formik) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Name"
                    name="name"
                    labelRequired="true"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Description"
                    name="description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Price"
                    name="price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Default Quantity"
                    name="defaultquantity"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Max Quantity"
                    name="maxquantity"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Category"
                    name="category"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikControl
                    labelLayout="left"
                    control="input"
                    label="Image URL"
                    name="imageurl"
                  />
                </Grid>
              </Grid>
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid}
                  style={{ float: 'right', marginTop: '20px' }}
                >
                  Edit Product
                </Button>
              </Grid>
              {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
};

export default CreateProductForm;
