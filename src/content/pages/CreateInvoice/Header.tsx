// Header1.js
import React from 'react';
import { Box, Grid } from '@mui/material';
import FormikControl from 'src/components/Formik/FormikControl';
import useBankDetail from 'src/services/GET_BANK_DETAILS';
const statusData = [
  { value: 'paid', label: 'Paid' },
  { value: 'status', label: 'Status' },
  { value: 'cancelled', label: 'Cancelled' }
];
const Header1 = () => {
  const { bank_details, refetch } = useBankDetail();

  const isoDateString = '2023-07-31T22:24:06.989Z';
  const date = new Date(isoDateString);
  const formattedDate = date.toISOString().split('T')[0]; // "2023-07-31"

  let bankDetailsArray = [];

  if (bank_details) {
    bankDetailsArray = bank_details.map(detail => ({
      value: parseInt(detail.id, 10),
      label: `${detail.bank} - ${detail.accountname} - ${detail.iban}`,
    }));
  }
  // console.log("asda",bank_details?.detail?.id)
  
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
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <FormikControl
          control="dropdown"
          type="text"
          label="Bank Account"
          name="bankdetailsid"
          options={bankDetailsArray}

        />{' '}
      </Grid>
    </Grid>
  );
};

export default Header1;
