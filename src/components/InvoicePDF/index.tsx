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
  id?: string;
  name: {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
  };
  units: string;
  unitPrice: number;
  unitVat: number;
  unitTotal: number;
}

interface InvoiceProps {
  invoiceNumber: string;
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
    currency: string;
    registrationnumber: string;
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
  date: string;
  currency: {
    name: string;
    symbol: string;
  };
  deliveryDate: string;
  products: Product[];
  subTotal: number;
  total: number;
  taxRate: number;
  totalTax: number;
  totalDiscount: number;
  discountRate: number;
  comments: string;
  paymentStatus: string;
}

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
                Invoice: {props.invoiceNumber}
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
              Delivery Date: {new Date(props.deliveryDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={'bold'}  variant="h6">Buyer Details:</Typography>
            <Typography >{props.buyerData.name}</Typography>
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
                {props.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name.name}</TableCell>
                    <TableCell>{product.units}</TableCell>

                    <TableCell>
                      {props.currency.symbol} {product.unitPrice}
                    </TableCell>
                    <TableCell>
                      {props.currency.symbol} {product.unitTotal}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={6}>
            <Typography>Comments: {props.comments}</Typography>
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
                {props.currency.symbol} {props.subTotal}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}
            >
              <Typography component="span">Tax ({props.taxRate}%):</Typography>
              <Typography component="span">
                {props.currency.symbol} {props.totalTax}
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
                Discount ({props.discountRate}%):
              </Typography>
              <Typography color={'green'} component="span">
                -{props.currency.symbol} {props.totalDiscount}
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
                {props.currency.symbol} {props.total}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <OrderConfirmationPrint />
      </Paper>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
    </>
  );
};

export default InvoicePDF;
