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

import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import supabase from '../../../config/supabaseClient.js';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const ItemRight = styled(Grid)(({ theme }) => ({
  textAlign: 'right'
}));
const logoStyle = {
  maxWidth: '200px',
  maxHeight: '100px',
  width: 'auto',
  height: 'auto'
};
const footerStyle = {
  position: 'fixed',
  color: '#00AED9',
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: '#f1f1f1',
  textAlign: 'center',
  zIndex: 9999
};
const InvoicePreviewSingle = ({ invoiceData }) => {
  const template_type = 'Order confirmation';

  //   const [invoiceData, setInvoiceData] = useState(null);
  const { id } = useParams();
  const customTheme = createTheme({
    typography: {
      fontSize: 11
    }
  } as ThemeOptions); // Type assertion here

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* <pre>{JSON.stringify(invoiceData, null, 2)}</pre> */}
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
          <Grid container>
            <Grid item xs={6} container>
              <ItemRight>
                <img
                  src="../../../public/bio2.png"
                  alt="My Image"
                  style={logoStyle}
                />
                <Typography
                  variant="h6"
                  style={{ fontWeight: 'bold' }}
                  align="left"
                  color="grey"
                >
                  {invoiceData?.sellers.displayname}
                </Typography>
              </ItemRight>
            </Grid>
            <Grid item xs={6}>
              <ItemRight>
                <Typography variant="h4">{template_type}</Typography>
                <Typography variant="h6">
                  Invoice Number:{' '}
                  <span style={{ color: '#00AED9' }}>
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
          {/* <BankDetails data={sellerData} /> */}
          <br />
          {/* <PaymentTerms /> */}
          {/* @ts-ignore */}
          <div id="footer" style={footerStyle}>
            OUR VISION AT BIOFROST IS TO BE THE MOST RESPECTED COLD THERAPY
            BRAND IN THE WORLD
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Buyers Representative</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Name and Signature: ___________________________</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Place and Date of issue: ___________________________</Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default InvoicePreviewSingle;
