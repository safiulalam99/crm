// Header1.js
import React from 'react';
import { Box, Grid } from '@mui/material';
import FormikControl from 'src/components/Formik/FormikControl';
import useBankDetail from 'src/services/GET_BANK_DETAILS';
import useAddressDetail from 'src/services/GET_SELLERS_ADDRESS';
const statusData = [
  { value: 'paid', label: 'Paid' },
  { value: 'status', label: 'Status' },
  { value: 'cancelled', label: 'Cancelled' }
];
const Header1 = () => {
  const { bank_details } = useBankDetail();
  const { seller_addresses } = useAddressDetail();

  const isoDateString = '2023-07-31T22:24:06.989Z';
  const date = new Date(isoDateString);
  const formattedDate = date.toISOString().split('T')[0]; // "2023-07-31"

  // Creating bank details options with safety check
  let bankDetailsArray = bank_details ? bank_details.map((detail) => ({
    value: detail.id,
    label: `${detail.bank} - ${detail.accountname} - ${detail.iban}`
  })) : [];

  // Creating address options with safety check
  let addressArray = seller_addresses ? seller_addresses.map((detail) => ({
    value: detail.id,
    label: `${detail.address} - ${detail.country}`
  })) : [];


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
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <FormikControl
          control="dropdown"
          type="text"
          label="Bank Account"
          name="bankdetailsid"
          options={bankDetailsArray}
        />{' '}
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <FormikControl
          control="dropdown"
          type="text"
          label="Address"
          name="sellerAddress"
          options={addressArray}
        />{' '}
      </Grid>
    </Grid>
  );
};

export default Header1;
