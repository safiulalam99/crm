import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CompanyDetails from '../CompanyDetails';

import seller from '../../../../Data/seller.json';
import buyer from '../../../../Data/buyer.json';
import { formatDate } from 'src/utils/formatDate';

const ItemRight = styled(Grid)(({ theme }) => ({
  textAlign: 'right'
}));
const ItemLeft = styled(Grid)(({ theme }) => ({
  textAlign: 'left'
}));
const Item = styled(Grid)(({ theme }) => ({
  textAlign: 'right'
}));

const logoStyle = {
  maxWidth: '200px',
  maxHeight: '100px',
  width: 'auto',
  height: 'auto'
};

export default function Header({ invoiceData }) {
  console.log(invoiceData)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} container>
          {/* ... */}
        </Grid>
        <Grid item xs={6}>
          <ItemRight>
            {invoiceData?.buyers?.contractnumber && (
              <Typography variant="body2" gutterBottom>
                Contract No: {invoiceData.buyers.contractnumber}
              </Typography>
            )}
            {invoiceData?.buyers?.currency?.name && invoiceData?.buyers?.currency?.symbol && (
              <Typography variant="body2" gutterBottom>
                Currency: {invoiceData.buyers?.currency?.name} ({invoiceData.buyers.currency.symbol})
              </Typography>
            )}
            {invoiceData?.buyers?.deliveryterm && (
              <Typography variant="body2" gutterBottom>
                Delivery Term: {invoiceData.buyers.deliveryterm}
              </Typography>
            )}
            {invoiceData?.deliverydate && (
              <Typography variant="body2" gutterBottom>
                Delivery Date:  {formatDate(invoiceData.deliverydate)}
              </Typography>
            )}
            {invoiceData?.deliverydate && (
              <Typography variant="body2" gutterBottom>
                Country of Origin:  {invoiceData?.sellers?.country}
              </Typography>
            )}
          </ItemRight>
        </Grid>
        
        <CompanyDetails invoiceData={invoiceData} />
      </Grid>
    </Box>
    
  );
}

