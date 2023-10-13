import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Grid,
  Container,
  Typography,
  Button,
  Badge,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import DataTable from 'src/components/DataTable'; // Renamed from Tables
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import useProducts from 'src/services/GET_PRODUCTS';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GridActionsCellItem } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { onDeleteProduct } from 'src/services/DELETE';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import ConfirmationDialog from 'src/components/ConfirmationDialog';

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
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState(null);
  
  const handleDeleteClick = (id) => () => {
    setToBeDeletedId(id);
    setDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await onDeleteProduct(toBeDeletedId, openSnackbar);
      setRows(rows.filter((row) => row.id !== toBeDeletedId));
      setDialogOpen(false);  // Close the dialog
    } catch (error) {
      console.log('Delete failed', error);
      setDialogOpen(false);  // Close the dialog
    }
  };
  
  const columns = [
    ,
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 150,
      renderCell: (params) => (
        <Link to={`/components/products/edit/${params.id}`}>
          {params.value.toString()}
        </Link>
      )
    },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 110 },
    {
      field: 'time_stamp',
      headerName: 'Created At',
      width: 200,
      valueFormatter: (params) => formatDate(params.value)
    },
    { field: 'defaultquantity', headerName: 'Default Quantity', width: 160 },
    { field: 'maxquantity', headerName: 'Max Quantity', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const status = params.value;
        let color;
        if (status === 'active') color = 'primary';
        else if (status === 'deleted') color = 'error';
        else if (status === 'archived') color = 'warning';
        return <Chip label={status} color={color} />;
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];
  const {
    products,
    error: productDataError,
    isLoading: productDataLoading
  } = useProducts();

  const initalRows = products ? products : [];
  const [rows, setRows] = useState(initalRows);

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
            <Button
              href="products/new"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
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
              <DataTable rows={initalRows} columns={columns} />
            ) : (
              <div>Error loading data</div>
            )}
          </Grid>
        </Grid>
      </Container>
      <ConfirmationDialog
      open={dialogOpen}
      onConfirm={handleDeleteConfirm}
      onCancel={() => setDialogOpen(false)}
      title="Delete Product"
      message="Are you sure you want to delete this product? This action cannot be undone."
    />
    </>
  );
}

export default ProductTablePage;
