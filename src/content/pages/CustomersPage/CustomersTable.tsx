import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import DataTable from 'src/components/DataTable';
import useGetCustomers from 'src/services/GET_CUSTOMERS';
import { Link } from 'react-router-dom';
// import { useSubmitCustomer } from 'src/services/your-customer-hook-file'; // import your hook
//
function CustomerTablePage() {
  const {
    customerData: customers, // Changed this line
    error: customerDataError,
    isLoading: customerDataLoading
  } = useGetCustomers(); // Use your hook here
  // Define columns for customer data
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 150,
      renderCell: (params) => (
        <Link to={`/components/customers/edit/${params.id}`}>
          {params.value}
        </Link>
      )
    },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'country', headerName: 'Country', width: 130 }
    // Add more fields as per your customer data
  ];

  const rows = customers ? customers : [];

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Customers
            </Typography>
            <Typography variant="subtitle2"></Typography>
          </Grid>
          <Grid item>
            <Button href="customers/new" variant="contained">
              Create Customer
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {customerDataLoading ? (
              <div
                style={{
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Your loader here */}
              </div>
            ) : customers ? (
              <DataTable rows={rows} columns={columns} />
            ) : (
              <div>Error loading data</div>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CustomerTablePage;
