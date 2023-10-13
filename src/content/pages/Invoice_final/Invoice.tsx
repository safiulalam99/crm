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
import { styled } from '@mui/material/styles';
import InvoicePreviewSingle from './InvoicePreviewSingle';
import GeneralTermsAndConditions from './GeneralTermsAndConditions';


const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const { id } = useParams();
  const customTheme = createTheme({
    typography: {
      fontSize: 11
    }
  } as ThemeOptions);
  useEffect(() => {
    const fetchInvoiceData = async () => {
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
        // window.print();

      } else {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();

  }, [id]);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <pre>{JSON.stringify(invoiceData, null, 2)}</pre>

        {/* <div className="page-break">
          <InvoicePreviewSingle invoiceData={invoiceData} />
        </div>
        <div className="page-break">
          <GeneralTermsAndConditions/>
        </div> */}

      </ThemeProvider>
    </React.Fragment>
  );
  
};

export default Invoice;
