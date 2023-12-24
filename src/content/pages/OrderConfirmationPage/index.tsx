import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Tables from 'src/components/DataTable';
import useInvoices from '../../../services/GET_order_confirmation';
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Status500 from '../Status/Status500';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  onDeleteInvoice,
  onDeleteOrderConfirmation
} from 'src/services/DELETE';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import { useEffect, useState } from 'react';
import ConfirmationDialog from 'src/components/ConfirmationDialog';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
function OrderConfirmationPage() {
  const { snackbarInfo, openSnackbar, closeSnackbar } = useSnackbar();
  const {
    invoiceData,
    error: invoiceDataError,
    isLoading: invoiceDataLoading
  } = useInvoices();

  const [rows, setRows] = useState([]); // Initialize rows state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  useEffect(() => {
    // Update rows state when invoiceData changes
    if (invoiceData) {
      setRows(
        invoiceData.map((item, index) => ({
          id: item.invoicenumber,
          time_stamp: item.time_stamp,
          invoicenumber: item.invoicenumber,
          // @ts-ignore
          name: item?.buyers?.name,
          deliverydate: item.deliverydate,
          total: item.total
        }))
      );
    }
  }, [invoiceData]);

  const handleDeleteClick = (id) => () => {
    setInvoiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDeleteOrderConfirmation(invoiceToDelete, openSnackbar); // Wait for the promise to resolve
      setRows(rows.filter((row) => row.id !== invoiceToDelete)); // Update rows only if the delete was successful
      setDeleteDialogOpen(false); // Close the dialog
    } catch (error) {
      // Handle the error if the delete was unsuccessful
      console.log('Delete failed', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false); // Close the dialog
    setInvoiceToDelete(null); // Reset the invoiceToDelete
  };

  const columns = [
    {
      field: 'invoicenumber',
      headerName: 'Order#',
      width: 130,
      renderCell: (params) => (
        <Link to={`/components/order_confirmation/pdf/${params.value}`}>
          {params.value.toString()}
        </Link>
      )
    },
    { field: 'name', headerName: 'Customer', width: 210 },
    { field: 'deliverydate', headerName: 'Due Date', width: 130 },
    { field: 'total', headerName: 'Amount', width: 90 },
    {
      field: 'time_stamp',
      headerName: 'Created at',
      width: 200,
      valueFormatter: (params) => formatDate(params.value)
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
            <Link to={'/components/order_confirmation/new'}>
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

      <ConfirmationDialog
        open={deleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        message={"Are you sure you want to delete this Order? This action cannot be undone"}
      />
    </>
  );
}

export default OrderConfirmationPage;
function setFetchedData(data: any[]) {
  throw new Error('Function not implemented.');
}
