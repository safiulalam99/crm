import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Container, Box } from '@mui/material';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import FormikInput from 'src/components/Formik/FormikInput';
import supabase from '../../../config/supabaseClient.js';
import InvoiceTemplate from 'src/components/InvoiceTemplate/Invoice.js';
import InvoicePDF from 'src/components/InvoicePDF';
import { useParams } from 'react-router-dom';

function InvoicePreview() {
  const [invoiceData, setInvoiceData] = useState(null);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    const fetchInvoiceData = async () => {
      // Call your API to fetch the data using the id
      const { data, error } = await supabase
        .from('invoices')
        .select(
          `
        *,
        buyerData:buyers (
          *,
          currency:currencies(*)
        ),
        sellerData:sellers (*),
        products:invoice_products (
          *,
          name:products (*)
        )
      `
        )
        .eq('invoicenumber', id)
        .single();

      if (data) {
        setInvoiceData(data);
      } else {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, [id]);

  // console.log(invoiceData);

  return (
    <>
      <Container>
        <Box m={2}></Box>
        <h1>Preview <span style={{ color: '#5569ff' }}>#{invoiceData?.invoicenumber}</span></h1>
        &nbsp;
        <Container style={{ background: 'white' }} maxWidth="lg">
          {invoiceData ? <InvoicePDF {...invoiceData} /> : 'Loading...'}
        </Container>
        <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
      </Container>
    </>
  );
}

export default InvoicePreview;
