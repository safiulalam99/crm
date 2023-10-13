import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Tables from 'src/components/DataTable';
import useInvoices from '../../../services/GET_Invoices';
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Status500 from '../Status/Status500';

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
        // @ts-ignore
        name: item.buyers.name,
        deliverydate: item.deliverydate,
        total: item.total
      }))
    : [];

  const columns = [
    {
      field: 'invoicenumber',
      headerName: 'Invoice#',
      width: 130,
      renderCell: (params) => (
        <Link to={`/components/pdf/${params.value}`}>
          {params.value.toString()}
        </Link>
      )
    },
    { field: 'name', headerName: 'Customer', width: 130 },
    { field: 'deliverydate', headerName: 'Due Date', width: 130 },
    { field: 'total', headerName: 'Amount', width: 90 },
    {
      field: 'time_stamp',
      headerName: 'Created at',
      width: 200,
      valueFormatter: (params) => formatDate(params.value)
    }
  ];

  // console.log(invoiceData);
  return (
    <>
      <Helmet>
        <title>Order Confirmations </title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Order Confirmation
            </Typography>
            <Typography variant="subtitle2">
              These are your recent Order Confirmation
            </Typography>
          </Grid>
          <Grid item>
            <Link to={'/components/invoice/new'}>
              <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained">
                Create Order Confirmation
              </Button>
            </Link>
          </Grid>
        </Grid>
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
              <Tables rows={rows} columns={columns} />
            ) : (
              <Status500 />
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
