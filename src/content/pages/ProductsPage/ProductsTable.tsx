import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Grid,
  Container,
  Typography,
  Button,
  Badge,
  Chip
} from '@mui/material';
import DataTable from 'src/components/DataTable'; // Renamed from Tables
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import useProducts from 'src/services/GET_PRODUCTS';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

const StatusBadge = ({ status }) => {
  let badgeColor;

  switch (status) {
    case 'active':
      badgeColor = 'success';
      break;
    case 'deleted':
      badgeColor = 'error';
      break;
    case 'archived':
      badgeColor = 'warning';
      break;
    default:
      badgeColor = 'default';
  }

  return (
    <Badge color={badgeColor} variant="dot">
      {status}
    </Badge>
  );
};

function ProductTablePage() {
  const {
    products,
    error: productDataError,
    isLoading: productDataLoading
  } = useProducts(); // Replaced useInvoices with useProducts

  // Define new columns based on the product fields
  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const status = params.value;
        let color;
        if (status === 'active') color = 'primary' ;
        else if (status === 'deleted') color = 'error';
        else if (status === 'archived') color = 'warning';
        return <Chip label={status} color={color} />;
      }
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Product Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'price', headerName: 'Price', width: 110 },
    {
      field: 'time_stamp',
      headerName: 'Created At',
      width: 200,
      valueFormatter: (params) => formatDate(params.value)
    },
    { field: 'defaultquantity', headerName: 'Default Quantity', width: 160 },
    { field: 'maxquantity', headerName: 'Max Quantity', width: 130 }
  ];

  const rows = products ? products : [];

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Products
            </Typography>
            <Typography variant="subtitle2">
              These are your recent products
            </Typography>
          </Grid>
          <Grid item>
  
              <Button href='products/new' sx={{ mt: { xs: 2, md: 0 } }} variant="contained">
                Create Product
              </Button>

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
            {productDataLoading ? (
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
            ) : products ? (
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

export default ProductTablePage;
