// FormikRow.js
import React from 'react';
import { Box, Grid } from '@mui/material';
import FormikControl from '../Formik/FormikControl';
import VatTypes from '../../Data/vatType.json';
const statusData= [
  { value: 'paid', label: 'Paid' },
  { value: 'status', label: 'Status' },
  { value: 'cancelled', label: 'Cancelled' }
]
const FormikRow = () => {
  const isoDateString = '2023-07-31T22:24:06.989Z';
  const date = new Date(isoDateString);
  const formattedDate = date.toISOString().split('T')[0]; // "2023-07-31"

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl
          control="input"
          type="text"
          label="Invoice Number"
          name="invoiceNumber"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl
          control="dropdown"
          type="text"
          label="Status"
          name="paymentStatus"
          options={statusData}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl control="date" type="date" label="Date" name="date" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl
          control="date"
          // type="date"
          label="Delivery Date"
          name="deliveryDate"
        />
      </Grid>

      {/* <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl
          control="input"
          type="text"
          label="Contract Number"
          name="contractNumber"
        />
      </Grid> */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <FormikControl
          control="input"
          type="text"
          label="Payment Term"
          name="paymentSplit"
        />{' '}
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl
          control="input"
          type="text"
          label="Reference Number"
          name="referenceNumber"
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormikControl
          // value={VatTypes}
          control="dropdown"
          type="text"
          label="Status"
          name="vatType"
          options={VatTypes}
        />
      </Grid> */}
    </Grid>
  );
};

export default FormikRow;
