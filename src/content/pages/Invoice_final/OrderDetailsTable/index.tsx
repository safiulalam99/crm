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
import {numberToWords} from '../../../../utils/towords'

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
  const hasLanguageVersion = invoiceData?.products.some(
    (product) => product.languageversion
  );
  const hasProductLot = invoiceData?.products.some(
    (product) => product.productlot
  );
  const loading = !invoiceData;

  console.log(invoiceData?.total.toFixed(1))
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
            {hasLanguageVersion && (
              <TableCell
                align="center"
                style={{ width: '7%', borderRight: '1px solid #ccc' }}
              >
                Language Version
              </TableCell>
            )}
            {hasProductLot && (
              <TableCell
                align="center"
                style={{ width: '10%', borderRight: '1px solid #ccc' }}
              >
                Lot No.
              </TableCell>
            )}
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
                {product?.units}
              </TableCell>
              <TableCell
                style={{ borderRight: '1px solid #ccc', color: '#00AED9' }}
              >
                {product.name?.name}
              </TableCell>
              {hasLanguageVersion && (
                <TableCell
                  align="center"
                  style={{ borderRight: '1px solid #ccc' }}
                >
                  {product?.languageversion}
                </TableCell>
              )}
              {hasProductLot && (
                <TableCell
                  align="center"
                  style={{ borderRight: '1px solid #ccc' }}
                >
                  {product.productlot}
                </TableCell>
              )}
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
      <Grid container justifyContent={'space-between'}>
        <Grid
          sx={{
            flex: '1 0 auto',
            maxWidth: 'calc(60% - 96px)'
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              paddingTop: '9px',
              wordWrap: 'break-word'
            }}
          >
            <Grid container wrap="nowrap">
              {/* <Grid item></Grid> */}
              <Grid item xs>
                <Typography variant="body2">{invoiceData?.comments}</Typography>{' '}
              </Grid>
            </Grid>
            {invoiceData?.paymentsplit && (
              <>
                <Grid paddingTop={'13px'}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Payment Term
                  </Typography>
                </Grid>
                <Grid container wrap="nowrap">
                  <Grid item xs>
                    <Typography variant="body2">
                      {invoiceData?.paymentsplit}
                    </Typography>{' '}
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
          {loading ? (
      <Typography variant="body1">Loading...</Typography>
    ) : invoiceData.total != null ? (
      <Typography variant="body1">{numberToWords(invoiceData.total.toFixed(2))}</Typography>
    ) : (
      <Typography variant="body1">Total not available</Typography>
    )}        </Grid>
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
                <Typography variant="body2">
                  VAT ({invoiceData?.taxrate}%)
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="right">
                  {invoiceData?.totaltax.toFixed(2)}
                </Typography>
              </Grid>

              {invoiceData?.totaldiscount !== 0 && (
                <>
                  <Grid item xs={8}>
                    <Typography variant="body2">Discount</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" align="right">
                      {invoiceData?.totaldiscount.toFixed(2)}
                    </Typography>
                  </Grid>
                </>
              )}

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
