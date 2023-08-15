import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button
} from '@mui/material';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer
} from '@react-pdf/renderer';
import MainInvoice from '../PDF/MainInvoice';
import Invoice from '../PDF/Invoices';

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

const styles = StyleSheet.create({
  page: {
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    marginBottom: 20
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10
  },
  table: {
    display: 'none',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#e0e0e0'
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 600
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  }
});

const invoice = {
  "id": "5df3180a09ea16dc4b95f910",
  "invoice_no": "201906-28",
  "balance": "$2,283.74",
  "company": "MANTRIX",
  "email": "susanafuentes@mantrix.com",
  "phone": "+1 (872) 588-3809",
  "address": "922 Campus Road, Drytown, Wisconsin, 1986",
  "trans_date": "2019-09-12",
  "due_date": "2019-10-12",
  "items": [
    {
      "sno": 1,
      "desc": "ad sunt culpa occaecat qui",
      "qty": 5,
      "rate": 405.89
    },
    {
      "sno": 2,
      "desc": "cillum quis sunt qui aute",
      "qty": 5,
      "rate": 373.11
    },
    {
      "sno": 3,
      "desc": "ea commodo labore culpa irure",
      "qty": 5,
      "rate": 458.61
    },
    {
      "sno": 4,
      "desc": "nisi consequat et adipisicing dolor",
      "qty": 10,
      "rate": 725.24
    },
    {
      "sno": 5,
      "desc": "proident cillum anim elit esse",
      "qty": 4,
      "rate": 141.02
    }
  ]
}
const InvoicePDF: React.FC<InvoiceProps> = (props) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* ... (rest of your component code using react-pdf primitives) */}
      </Page>
    </Document>
  );
};
const InvoiceTemplate: React.FC<InvoiceProps> = (props) => {
  const [showPDF, setShowPDF] = useState(false);
 
  return (
    // <>
    //   <Button variant="contained" color="primary" >
    //     Export to PDF
    //   </Button>
    //   <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
    //     <Grid container spacing={3}>
    //       <Grid item xs={6}>
    //         <Typography variant="h5">Invoice: {props.invoiceNumber}</Typography>
    //         <Typography>
    //           Date: {new Date(props.date).toLocaleDateString()}
    //         </Typography>
    //         <Typography>
    //           Delivery Date: {new Date(props.deliveryDate).toLocaleDateString()}
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6} style={{ textAlign: 'right' }}>
    //         <Typography variant="h5">{props.sellerData.name}</Typography>
    //         <Typography>{props.sellerData.address}</Typography>
    //         <Typography>VAT Number: {props.sellerData.vatnumber}</Typography>
    //         <Typography>Country: {props.sellerData.country}</Typography>
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Typography variant="h6">Buyer Details:</Typography>
    //         <Typography>Name: {props.buyerData.name}</Typography>
    //         <Typography>Address: {props.buyerData.address}</Typography>
    //         <Typography>Country: {props.buyerData.country}</Typography>
    //         <Typography>VAT Number: {props.buyerData.vatnumber}</Typography>
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Table>
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>Product Name</TableCell>
    //               <TableCell>Unit Price</TableCell>
    //               <TableCell>Units</TableCell>
    //               <TableCell>Total</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {props.products.map((product, index) => (
    //               <TableRow key={index}>
    //                 <TableCell>{product.name.name}</TableCell>
    //                 <TableCell>
    //                   {props.currency.symbol} {product.unitPrice}
    //                 </TableCell>
    //                 <TableCell>{product.units}</TableCell>
    //                 <TableCell>
    //                   {props.currency.symbol} {product.unitTotal}
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography>Comments: {props.comments}</Typography>
    //       </Grid>
    //       <Grid item xs={6} style={{ textAlign: 'right' }}>
    //         <Typography>
    //           Sub Total: {props.currency.symbol} {props.subTotal}
    //         </Typography>
    //         <Typography>
    //           Tax ({props.taxRate}%): {props.currency.symbol} {props.totalTax}
    //         </Typography>
    //         <Typography>
    //           Discount ({props.discountRate}%): -{props.currency.symbol}{' '}
    //           {props.totalDiscount}
    //         </Typography>
    //         <Typography variant="h6">
    //           Total: {props.currency.symbol} {props.total}
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </>

    <>
      {showPDF ? (
        <PDFViewer width="1000" height="600" className="app">
          <Invoice invoice={invoice} />
        </PDFViewer>
      ) : (
        <>
          <MainInvoice />
          <button onClick={() => setShowPDF(true)}>View PDF</button>
        </>
      )}
    </>
  );
};

export default InvoiceTemplate;
