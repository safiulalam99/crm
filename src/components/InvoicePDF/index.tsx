import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
  Avatar
} from '@mui/material';
import { Image } from '@mui/icons-material';
import OrderConfirmationPrint from '../OrderConfirmationPrint';

interface Product {
  id?: number;
  invoicenumber: string;
  product_id: number;
  units: number;
  unitprice: number;
  unitvat: number;
  unittotal: number;
  name: {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
  };
}

interface InvoiceProps {
  invoicenumber: string;
  vattype: string;
  date: string;
  deliveryterm: string | null;
  deliverydate: string;
  paymentsplit: string;
  subtotal: number;
  total: number;
  taxrate: number;
  totaltax: number;
  totaldiscount: number;
  discountrate: number;
  numberinwords: string | null;
  comments: string;
  paymentstatus: string;
  buyer_id: number;
  seller_id: number;
  currency_id: number;
  time_stamp: string;
  buyerData: {
    id: number;
    name: string;
    address: string;
    country: string;
    vatnumber: string;
    contractnumber: string;
    representative: string;
    paymentterm: string;
    deliveryterm: string;
    registrationnumber: string;
    currency_id: number;
    currency: {
      id: number;
      name: string;
      symbol: string;
    };
  };
  sellerData: {
    id: number;
    name: string;
    address: string;
    vatnumber: string;
    displayname: string;
    managingdirector: string;
    country: string;
  };
  products: Product[];
}

const commentStyle = {
  wordWrap: 'break-word', // This will break the word at the end of the line.
  overflowWrap: 'break-word', // It breaks the line as necessary to prevent overflow.
  maxWidth: '100%' // Ensures the container doesn't exceed its parent's width.
};

const InvoicePDF: React.FC<InvoiceProps> = (props) => {
  const handlePrint = () => {
    window.print();
  };

  const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #inv-grid, #inv-grid * {
      visibility: visible;
    }
    #inv-grid {
      position: absolute;
      left: 0;
      top: 0;
    }
    /* Ensure background colors are printed */
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    /* Set table header color */
    #inv-grid .MuiTableHead-root .MuiTableRow-root {
      background-color: #f5f5f5; /* light gray color */
    }
    /* Page Break */
    #inv-grid {
      page-break-after: always; /* This forces a page break after the end of the content in #inv-grid */
    }
  }
`;

  return (
    <>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Export to PDF
      </Button>
      <Paper
        id="invoice-paper"
        elevation={3}
        style={{ padding: '30px', margin: '30px' }}
      >
        <div style={{ pageBreakAfter: 'always' }}>
          <Grid id="inv-grid" container spacing={3}>
            <Grid item xs={6}>
              <Grid item xs={6}>
                <img
                  width="100"
                  height="100"
                  src="\public\icon-192x192.png"
                  alt="Company Logo"
                  style={{ marginBottom: '10px' }}
                />
                <Typography variant="h5">
                  Invoice: {props.invoicenumber}
                </Typography>
              </Grid>
              <Typography variant="h5">{props.sellerData.name}</Typography>
              <Typography>{props.sellerData.address}</Typography>
              <Typography>VAT Number: {props.sellerData.vatnumber}</Typography>
              <Typography>Country: {props.sellerData.country}</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Typography>
                Date: {new Date(props.date).toLocaleDateString()}
              </Typography>
              <Typography>
                Delivery Date:{' '}
                {new Date(props.deliverydate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight={'bold'} variant="h6">
                Buyer Details:
              </Typography>
              <Typography>{props.buyerData.name}</Typography>
              <Typography>{props.buyerData.address}</Typography>
              <Typography>{props.buyerData.country}</Typography>
              <Typography>{props.buyerData.contractnumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.products ? (
                    props.products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {product.name ? product.name.name : 'Not Found'}
                        </TableCell>
                        <TableCell>{product.units}</TableCell>
                        <TableCell>
                          {props.buyerData.currency.symbol} {product.unitprice}
                        </TableCell>
                        <TableCell>
                          {props.buyerData.currency.symbol} {product.unittotal}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>Loading...</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={6}>
              <Typography style={commentStyle}>
                Comments: {props.comments}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}
              >
                <Typography component="span">Sub Total:</Typography>
                <Typography component="span">
                  {props.buyerData.currency.symbol} {props.subtotal}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}
              >
                <Typography component="span">
                  Tax ({props.taxrate}%):
                </Typography>
                <Typography component="span">
                  {props.buyerData.currency.symbol} {props.totaltax}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}
              >
                <Typography component="span">
                  Discount ({props.discountrate}%):
                </Typography>
                <Typography color={'green'} component="span">
                  -{props.buyerData.currency.symbol} {props.totaldiscount}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}
              >
                <Typography component="span" variant="h6">
                  Total:
                </Typography>
                <Typography component="span" variant="h6">
                  {props.buyerData.currency.symbol} {props.total}
                </Typography>
              </div>
            </Grid>
            <div style={{ pageBreakBefore: 'always' }}>
              <OrderConfirmationPrint />
            </div>{' '}
          </Grid>
        </div>
      </Paper>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
    </>
  );
};

export default InvoicePDF;
