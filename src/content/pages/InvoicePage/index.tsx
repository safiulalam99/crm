import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Tables from 'src/components/DataTable';
import useInvoices from '../../../services/GET_Invoices';
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
function InvoicePage() {
  const {
    invoiceData,
    error: invoiceDataError,
    isLoading: invoiceDataLoading
  } = useInvoices();

  const rows = invoiceData
    ? invoiceData.map((item, index) => ({
        id: item.invoicenumber,
        time_stamp: item.time_stamp,
        invoicenumber: item.invoicenumber,
        name: item.buyers.name,
        deliverydate: item.deliverydate,
        total: item.total
      }))
    : [];

  const columns = [
    {
      field: 'time_stamp',
      headerName: 'Created at',
      width: 200,
      valueFormatter: (params) => formatDate(params.value)
    },
    { field: 'invoicenumber', headerName: 'Invoice#', width: 130 },
    { field: 'name', headerName: 'Customer', width: 130 },
    { field: 'deliverydate', headerName: 'Due Date', width: 130 },
    { field: 'total', headerName: 'Amount', width: 90 }
  ];

  // console.log(invoiceData);
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
      </Grid>
    </PageTitleWrapper>
    <Container maxWidth="lg">
      <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          {invoiceDataLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <SuspenseLoader />
            </div>
          ) : invoiceData ? (
            <Tables rows={rows} columns={columns} />
          ) : (
            <div>Error loading data</div>
          )}
        </Grid>
      </Grid>
    </Container>
  </>
  );
}

export default InvoicePage;
function setFetchedData(data: any[]) {
  throw new Error('Function not implemented.');
}
