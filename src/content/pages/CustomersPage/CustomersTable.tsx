import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import DataTable from 'src/components/DataTable';
import useGetCustomers from 'src/services/GET_CUSTOMERS';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import { useEffect, useState } from 'react';
import { onDeleteCustomer } from 'src/services/DELETE';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmationDialog from 'src/components/ConfirmationDialog';

function CustomerTablePage() {
  const {
    customers,
    error: customerDataError,
    isLoading: customerDataLoading
  } = useGetCustomers();
  const initalRows = customers ? customers : [];
  const [rows, setRows] = useState(initalRows);
  useEffect(() => {
    if (customers) {
      setRows(customers);
    }
  }, [customers]);

  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleDeleteClick = (id) => () => {
    setCustomerToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDeleteCustomer(customerToDelete, openSnackbar);
      setRows(rows.filter((row) => row.id !== customerToDelete));
    } catch (error) {
      openSnackbar(error.details, 'error');
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 210,
      renderCell: (params) => (
        <Link to={`/components/customers/edit/${params.id}`}>
          {params.value}
        </Link>
      )
    },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'country', headerName: 'Country', width: 130 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            showInMenu
          />
        ];
      }
    }
  ];

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
      <ConfirmationDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        message="Are you sure you want to delete this customer?"
      />
    </>
  );
}

export default CustomerTablePage;
