import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, Container, Button, Box, Paper } from '@mui/material';
import FormikControl from '../Formik/FormikControl';
import { INITIAL_VALUES } from '../../utils/utils';
import { Rowing } from '@mui/icons-material';
import Header1 from '../Header1';
import Header2 from '../Header2';
import FormikTable from '../Formik/FormikTable';
import { useFormikContext } from 'formik';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const FormikContainer = () => {
  const validationSchema = Yup.object({
    invoiceNumber: Yup.string().required('Required'),
    buyerData: Yup.object().required('Required'),
    // date: Yup.toISOString().required('Required'),
    deiveryDate: Yup.date().required('Required'),
    sellerData: Yup.object().required('Required')
  });

  const form = useForm();
  const { register, control } = form;

  return (
    <Container maxWidth="lg">
      <form>
        <Grid container justifyContent={'center'} spacing={2}>
          <Header1 />
          {/* <Header2 /> */}
          {/* <Paper sx={{ width: '100%', marginTop: 2 }}>
            <FormikTable values={formik.values?.products} name="products" />
          </Paper> */}
          <>
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} marginTop={2}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <FormikControl
                    control="TextArea"
                    label={'Notes'}
                    name="comments"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} marginTop={2}>
                <Grid xs={12} sm={12} md={12} lg={12}>
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
                    <Grid>sample</Grid>
                    <Grid>sample</Grid>
                    <Grid>sample</Grid>
                    <Grid>sample</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}
          </>
        </Grid>
        <Grid item>
          <Button type="submit">Submit</Button>
        </Grid>

        {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
      </form>
      <DevTool control={control}/>
    </Container>
  );
};

export default FormikContainer;
