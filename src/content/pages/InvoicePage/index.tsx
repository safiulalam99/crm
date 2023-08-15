import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from 'src/content/dashboards/Tasks/PageHeader';
import RecentOrders from 'src/content/applications/Transactions/RecentOrders';
import Tables from 'src/components/Tables';
import useInvoices from '../../../services/GET_Invoices';
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';

function ApplicationsTransactions() {
  const {
    invoiceData,
    error: invoiceDataError,
    isLoading: invoiceDataLoading
  } = useInvoices();

  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Invoices
            </Typography>
            <Typography variant="subtitle2">
              These are your recent Invoices
            </Typography>
          </Grid>
          <Grid item>
            <Link to={'/components/invoice/new'}>
              <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained">
                Create Invoice
              </Button>
            </Link>
          </Grid>
        </Grid>{' '}
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {invoiceDataLoading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px'
                }}
              >
                <SuspenseLoader />
              </div>
            ) : invoiceData ? (
              <Tables data={invoiceData} />
            ) : (
              <div>Error loading data</div>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
