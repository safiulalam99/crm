import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  maxWidth: '100%',
  margin: theme.spacing(2),
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

interface StatCardProps {
  title: string;
  value: string;
  total: string;
  percentageChange: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, total, percentageChange }) => (
  <StyledCard>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
      <Typography color="textSecondary">
        {total}
      </Typography>
      <Box sx={{ pt: 1 }}>
        <Typography color="textSecondary" variant="body2">
          {percentageChange.toFixed(1)}% Change
        </Typography>
      </Box>
    </CardContent>
  </StyledCard>
);

const BusinessStatsGrid: React.FC<{ currencySymbol: string, customer_dashboard_details: any }> = ({ currencySymbol, customer_dashboard_details }) => {
  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <StatCard
          title="Commercial Invoices"
          value={`${currencySymbol} ${customer_dashboard_details?.total_amount_invoices}`}
          total={`${customer_dashboard_details?.total_invoice_transactions} Invoices Created`}
          percentageChange={10.1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <StatCard
          title="Pro forma Invoices"
          value={`${currencySymbol} ${customer_dashboard_details?.total_amount_proforma}`}
          total={`${customer_dashboard_details?.total_proforma_transactions} Invoices Created`}
          percentageChange={10.1}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <StatCard
          title="Order Confirmation"
          value={`${currencySymbol} ${customer_dashboard_details?.total_amount_order_confirmation}`}
          total={`${customer_dashboard_details?.total_order_confirmation_transactions} Invoices Created`}
          percentageChange={10.1}
        />
      </Grid>
    </Grid>
  );
};

export default BusinessStatsGrid;
