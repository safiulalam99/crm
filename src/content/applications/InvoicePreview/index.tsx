import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Container, Box } from '@mui/material';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import FormikInput from 'src/components/Formik/FormikInput';
import FormikContainer from 'src/components/Formik/FormikContainer';
import supabase from '../../../config/supabaseClient.js';
import InvoiceTemplate from 'src/components/InvoiceTemplate/index.js';
import InvoicePDF from 'src/components/InvoicePDF';
import { Document, render } from '@react-pdf/renderer';

const data = {
  invoiceNumber: '1234das',
  buyerData: {
    id: 2,
    name: 'Tech Ltd',
    address: '456 Tech Ave',
    country: 'USA',
    vatnumber: 'US 12345678',
    contractnumber: 'US29082021',
    representative: 'John Smith',
    paymentterm: '30 days',
    deliveryterm: 'FOB',
    currency: 'USD',
    registrationnumber: '98765432'
  },
  sellerData: {
    id: 3,
    name: 'Creative Minds',
    address: '456 Creative Ave, Toronto, Canada',
    vatnumber: 'CA87654321',
    displayname: 'Creative Minds Inc.',
    managingdirector: 'Lucy Green',
    country: 'CANADA'
  },
  vatType: {},
  date: '2023-08-11T21:00:00.000Z',
  currency: {
    name: 'Euro',
    symbol: '€'
  },
  deliveryTerm: '',
  deliveryDate: '2023-08-15T22:22:10.000Z',
  paymentSplit: 'sdsdfsdfsdfsdfsdf',
  products: [
    {
      name: {
        id: 1,
        name: 'Desktop Organizer',
        description: 'Small desktop organizer with compartments',
        category: 'office supplies',
        price: 19.99
      },
      units: '03',
      unitPrice: 19.99,
      unitVat: 0,
      unitTotal: 59.97
    },
    {
      name: {
        id: 1,
        name: 'Desktop Organizer',
        description: 'Small desktop organizer with compartments',
        category: 'office supplies',
        price: 19.99
      },
      units: '03',
      unitPrice: 19.99,
      unitVat: 0,
      unitTotal: 59.97
    },
    {
      id: 'll5q5nf4mvm75a2iaxs',
      name: {
        id: 1,
        name: 'Desktop Organizer',
        description: 'Small desktop organizer with compartments',
        category: 'office supplies',
        price: 19.99
      },
      units: '02',
      unitPrice: 19.99,
      unitVat: 0,
      unitTotal: 39.98
    }
  ],
  subTotal: 99.95,
  total: 100.95,
  taxRate: 3,
  totalTax: 3,
  totalDiscount: 2,
  discountRate: 2,
  numberInWords: '',
  comments: 'sadfsdf',
  paymentStatus: 'status'
};

function InvoicePreview() {
  return (
    <>
      <Container>
        <Box m={2}></Box>
        <h1>Create</h1>
        &nbsp;
        <Container style={{ background: 'white' }} maxWidth="lg">
          {/* <InvoiceTemplate {...data} /> */}
          <InvoicePDF {...data} />
        </Container>
      </Container>
    </>
  );
}

export default InvoicePreview;
