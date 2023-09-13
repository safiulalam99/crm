import React, { useEffect, useState } from 'react';
import Header from './Header';
import OrderDetailsTable from './OrderDetailsTable';
import BankDetails from './BankDetails';
import CompanyDetails from './CompanyDetails';
import PaymentTerms from './PaymentTerms';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { atoms } from "../Home";
// import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import sellerData from '../../../data_fin/seller.json';
import buyers from '../../../data_fin/buyer.json';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import supabase from '../../../config/supabaseClient.js';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { styled } from "@mui/material/styles";

const ItemRight = styled(Grid)(({ theme }) => ({
  textAlign: "right",
}));
const logoStyle = {
  maxWidth: "200px",
  maxHeight: "100px",
  width: "auto",
  height: "auto",
};
const Invoice = () => {
  const [buyerName, setBuyerName] = useState('');
  const [headerDetails, setHeaderDetails] = useState('');

  const template_type = 'Order confirmation';

  const [invoiceData, setInvoiceData] = useState(null);
  const { id } = useParams();
  const customTheme = createTheme({
    typography: {
      fontSize: 11
    }
  } as ThemeOptions); // Type assertion here
  // console.log(id);
  useEffect(() => {
    const fetchInvoiceData = async () => {
      // Call your API to fetch the data using the id
      const { data, error } = await supabase
        .from('invoices')
        .select(
          `
        *,
        buyers:buyers (
          *,
          currency:currencies(name, symbol)
        ),
        sellers:sellers (*),
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
  // console.log(invoiceData.products);
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* <pre>{JSON.stringify(invoiceData, null, 2)}</pre> */}
      <ThemeProvider theme={customTheme}>
        <Container
          className="component"
          maxWidth="md"
          // sx={{ paddingTop: '40px' }}
        >
          <Container
            className="invoice-component"
            maxWidth="md"
            sx={{ paddingTop: '40px' }}
          >
            <Grid container >
            <Grid item xs={6} container>
          <ItemRight>
            <img src="../../../public/bio2.png" alt="My Image" style={logoStyle} />
            <Typography
              variant="h6"
              style={{ fontWeight: "bold" }}
              align="left"
              color="grey"
            >
              {invoiceData?.sellers.displayname}
            </Typography>
          </ItemRight>
        </Grid>
            <Grid item xs={6} >
              
                <ItemRight>
              <Typography variant="h4">{template_type}</Typography>
                <Typography variant="h6">
                  Invoice Number:{' '}
                  <span style={{ color: '#5569ff' }}>
                    #{invoiceData?.invoicenumber}
                  </span>
                </Typography>
              <Typography variant="h6">Date: {invoiceData?.date}</Typography>
                </ItemRight>
            </Grid>
            </Grid>

            <Header invoiceData={invoiceData} />
            <br />
            <OrderDetailsTable invoiceData={invoiceData} />
            <br />
            <BankDetails data={sellerData} />
            <br />
            <PaymentTerms />
          </Container>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Invoice;
