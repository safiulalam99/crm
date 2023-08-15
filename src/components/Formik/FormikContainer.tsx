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
import { useFormikContext } from 'formik';
import supabase from '../../config/supabaseClient.js';
import buyerData from '../../Data/buyer.json';
import sellerData from '../../Data/seller.json';
import { useNavigate } from 'react-router-dom';

// import { onSubmitInvoice } from '../../services/POST_InvoiceData';

export const onSubmitInvoice = async (values, actions, navigate) => {
  
  try {
    // Insert into the invoices table
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .insert([
        {
          buyer_id: values.buyerData.id,
          seller_id: values.sellerData.id,
          // currency_id: values.currency.id,
          comments: values.comments,
          date: values.date,
          deliverydate: values.deliveryDate,
          // deliveryterm: values.deliveryTerm,
          discountrate: values.discountRate,
          invoicenumber: values.invoiceNumber,
          // numberinwords: values.numberInWords,
          paymentsplit: values.paymentSplit,
          paymentstatus: values.paymentStatus,
          subtotal: values.subTotal,
          taxrate: values.taxRate,
          total: values.total,
          totaldiscount: values.totalDiscount,
          totaltax: values.totalTax,
          vattype: values.vatType
        }
      ]);

    if (invoiceError) throw invoiceError;

    // Insert into the invoice_products table
    for (let product of values.products) {
      const { error: productError } = await supabase
        .from('invoice_products')
        .insert([
          {
            invoicenumber: values.invoiceNumber,
            product_id: product.name.id,
            unitprice: product.unitPrice,
            units: product.units,
            unittotal: product.unitTotal,
            unitvat: product.unitVat
          }
        ]);
      if (productError) throw productError;
    }

    // Handle successful insertion
    alert('Invoice data successfully inserted!');
    actions.resetForm();
    navigate(`/components/invoice/preview/${values.invoiceNumber}`);
    console.log("comps", values.invoiceNumber)
  } catch (error) {
    console.error('Error inserting invoice data:', error);
    alert('There was an error inserting the invoice data.');
  }
};

const FormikContainer = () => {
const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          onSubmitInvoice(values, actions, navigate)
        }
      >
        {(formik) => (
          <Form>
            <Grid container justifyContent={'center'} spacing={2}>
              {/* <Header1 /> */}
              <Header1 setFieldValue={formik.setFieldValue} />
              <Header2 setFieldValue={formik.setFieldValue} />
              <Paper sx={{ width: '100%', marginTop: 2 }}>
                <FormikTable values={formik.values?.products} name="products" />
              </Paper>
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6} marginTop={2}>
                    <Grid xs={12} sm={12} md={12} lg={12}>
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
              <Button type="submit">Submit</Button>
            </Grid>

            <pre>{JSON.stringify(formik.values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FormikContainer;
