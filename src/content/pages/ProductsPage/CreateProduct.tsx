import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box, Typography } from '@mui/material';
import FormikControl from '../../../components/Formik/FormikControl';
import { onSubmitProduct } from '../../../services/POST_products'; // Update this to POST_products

import { useState } from 'react';

import React from 'react';
import { useSnackbar } from 'src/contexts/SnackbarContext';
const initialValues = {
  name: '',
  description: '',
  category: '',
  price: 0,
  defaultquantity: 0,
  maxquantity: 0,
  imageurl: ''
};
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
          onSubmit={
            (values, actions) => onSubmitProduct(values, actions, openSnackbar) // <-- Update this to include openSnackbar
          } // Update this to POST_products
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
                  Create Product
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
