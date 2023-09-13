import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Function to calculate subtotal
const calculateSubtotal = (products) => {
  return products.reduce((acc, curr) => acc + curr.unitTotal, 0);
};

// Function to calculate VAT (assuming VAT is 7%)
const calculateVAT = (subtotal) => {
  return 0.07 * subtotal;
};


const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary
}));

export default function ProductTable({ invoiceData }) {

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} size="small" aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              style={{ width: '10%', borderRight: '1px solid #ccc' }}
            >
              Units
            </TableCell>
            <TableCell style={{ width: '50%', borderRight: '1px solid #ccc' }}>
              Name
            </TableCell>
            <TableCell
              align="center"
              style={{ width: '10%', borderRight: '1px solid #ccc' }}
            >
              Unit Price
            </TableCell>
            <TableCell
              align="center"
              style={{ width: '10%', borderRight: '1px solid #ccc' }}
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData?.products.map((product, index) => (
            <TableRow
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? '#f3f3f3' : 'white' }}
            >
              <TableCell
                align="center"
                style={{ borderRight: '1px solid #ccc' }}
              >
                {product.units}
              </TableCell>
              <TableCell
                style={{ borderRight: '1px solid #ccc', color: '#0086b3' }}
              >
                {product.name.name}
              </TableCell>
              <TableCell
                align="center"
                style={{ borderRight: '1px solid #ccc' }}
              >
                {product.unitprice}
              </TableCell>
              <TableCell align="right">{product.unittotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid
        container
        justifyContent={'space-between'}
      >
        <Grid
          sx={{
            
            flex: '1 0 auto',
            maxWidth: 'calc(60% - 96px)'
          }}
        >
          <Box sx={{ overflow: 'hidden', paddingTop:'9px', wordWrap: 'break-word' }}>
            <Grid container wrap="nowrap" >
              {/* <Grid item></Grid> */}
              <Grid item xs>
              <Typography variant="body2">{invoiceData?.comments}</Typography>              </Grid>
            </Grid>
            <Grid paddingTop={'13px'}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Invoice Term</Typography>
            </Grid>
            <Grid container wrap="nowrap"  >
              <Grid item xs>
              <Typography variant="body2">{invoiceData?.paymentsplit}</Typography>              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Box>
          <Box sx={{ px: 1, py: 1 }}>
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <Typography variant="body2">Subtotal</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="right">
                  {invoiceData?.subtotal.toFixed(2)} 
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">VAT ({invoiceData?.taxrate}%)</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="right">
                  {invoiceData?.totaltax.toFixed(2)} 
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">Total</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="right">
                  {invoiceData?.total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </TableContainer>
  );
}
