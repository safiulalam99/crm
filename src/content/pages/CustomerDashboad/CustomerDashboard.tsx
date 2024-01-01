import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Container
} from '@mui/material';

import SimpleLineChart from 'src/components/LineChart/LineChart';
import ProformaTable from './ProformaTable';
import InvoiceTable from './InvoiceTable';
import OrderTable from './OrderTable';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { customerDashboardDetailsAtom, userAtom } from 'src/atoms/atoms';
import { usefetchCustomerDashboardDetails } from 'src/services/GET_CUSTOMER_DASHBOARD';
import { useParams } from 'react-router-dom';
import useAddressDetail from 'src/services/GET_SELLERS_ADDRESS';
import StatCard from './StatCard';
import CustomerInformation from './CustomerCard';
import DetailCard from './CustomerCard';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { getLoggedInUserDetails } from 'src/contexts/AuthContext';
import { useCookies } from 'react-cookie';
import BusinessStatsGrid from './Stat';
import { OverviewBudget } from './Card1';
import { OverviewTasksProgress } from './Card2';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface DetailCardProps {
  title: string;
  buyer_country?: string | null;
  buyer_vatnumber?: string | null;
  buyer_contractnumber?: string | null;
  buyer_address?: string | null;
  buyer_contact_details?: string | null;
  buyer_contactperson?: string | null;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <Card sx={{ minWidth: 275, maxWidth: 23 }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const CustomerDashboard = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [userIdCookies] = useCookies(['userId']);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const { id } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const setcustomerDashboardDetailsAtom = useSetAtom(
    customerDashboardDetailsAtom
  );

  const {
    customer_dashboard_details,
    customer_dashboard_details_isLoading,
    customer_dashboard_details_error // @ts-ignore
  } = usefetchCustomerDashboardDetails(id, userIdCookies.userId || '');

  useEffect(() => {
    setcustomerDashboardDetailsAtom(customer_dashboard_details);
  }, [customer_dashboard_details]);

  const currencySymbol =
    customer_dashboard_details?.currency_details?.[0]?.currency?.symbol || '€';


  if (customer_dashboard_details_isLoading) {
    return <SuspenseLoader />;
  }

  if (customer_dashboard_details_error) {
    return <div>Error: {customer_dashboard_details_error}</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <OverviewBudget
            color="error.main"
            subtitle={`${customer_dashboard_details?.total_invoice_transactions} Invoices Created`}
            title="Commercial Invoice"
            difference={12}
            value={`${currencySymbol} ${customer_dashboard_details?.total_amount_invoices}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <OverviewBudget
            color="success.main"
            subtitle={`${customer_dashboard_details?.total_proforma_transactions} Invoices Created`}
            title="Pro forma Invoice"
            difference={12}
            value={`${currencySymbol} ${customer_dashboard_details?.total_amount_proforma}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <OverviewBudget
            color="warning.main"
            subtitle={`${customer_dashboard_details?.total_order_confirmation_transactions} Invoices Created`}
            title="Order Confirmation"
            difference={12}
            value={`${currencySymbol} ${customer_dashboard_details?.total_amount_order_confirmation}`}
          />{' '}
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom paddingTop={4}>
        {/* @ts-ignore  */}
        Customer Information
      </Typography>
      {/* Client Details and Address */}
      <Grid container spacing={2} paddingBottom={2}>
        <Grid item xs={12} md={12}>
          <DetailCard buyer_data={customer_dashboard_details} />
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <DetailCard
            title="Client Address"
            content="1234 Main St, Anytown, AT 12345"
          />
        </Grid> */}
      </Grid>

      <Typography variant="h4" gutterBottom paddingTop={2}>
        Customer Name
      </Typography>
      <Grid container>
        <Card sx={{ overflow: 'hidden', marginBottom: 2 }}></Card>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2
            }}
          >
            {/* Transactions Table */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Invoices" {...a11yProps(0)} />
              <Tab label="Order Confirmation" {...a11yProps(1)} />
              <Tab label="Proforma" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <InvoiceTable />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <OrderTable />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ProformaTable />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerDashboard;
