import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Button } from '@mui/material';
import Tables from 'src/components/DataTable';
import useInvoices from '../../../services/GET_proforma';
import { Link } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import Status500 from '../Status/Status500';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { onDeleteInvoice, onDeleteProforma } from 'src/services/DELETE';
import { useSnackbar } from 'src/contexts/SnackbarContext';
import { useContext, useEffect, useState } from 'react';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import { UserContext } from 'src/contexts/UserContext';

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
  const userContext = useContext(UserContext);
  const [rows, setRows] = useState([]); // Initialize rows state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const { user } = userContext;
  useEffect(() => {
    // Update rows state when invoiceData changes
    if (invoiceData) {
      setRows(
        invoiceData.map((item, index) => ({
          id: item.proforma_id,
          time_stamp: item.time_stamp,
          invoicenumber: item.invoicenumber,
          // @ts-ignore
          name: item?.buyers?.name,
          deliverydate: item.deliverydate,
          total: item.total,
          proforma_id: item?.proforma_id
        }))
      );
    }
  }, [invoiceData]);

  const handleDeleteClick = (id) => () => {
    setInvoiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!invoiceToDelete) return;
    try {
      // Assuming invoiceToDelete now contains the entire row data
      await onDeleteProforma(
        invoiceToDelete.invoicenumber,
        user?.id,
        invoiceToDelete.proforma_id,
        openSnackbar
      );
      setRows(
        rows.filter((row) => row.proforma_id !== invoiceToDelete.proforma_id)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      // Consider showing a more user-friendly error message here
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false); // Close the dialog
    setInvoiceToDelete(null); // Reset the invoiceToDelete
  };

  const columns = [
    // {
    //   field: 'proforma_id',
    //   headerName: 'Order#',
    //   width: 200,
    //   renderCell: (params) => (
    //     <Link to={`/components/proforma/pdf/${params.row.name}`}>
    //       {params.value.toString()}
    //     </Link>
    //   )
    // },
    {
      field: 'invoicenumber',
      headerName: 'ID',
      width: 210,
      renderCell: (params) => (
        <Link to={`/components/proforma/pdf/${params.row.proforma_id}`}>
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
      // ... other properties ...
      getActions: (params) => {
        // Pass the entire row data to handleDeleteClick
        return [
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            label="Delete"
            onClick={handleDeleteClick(params.row)}
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
        <title>Pro Forma</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Pro Forma
            </Typography>
            <Typography variant="subtitle2"></Typography>
          </Grid>
          <Grid item>
            <Link to={'/components/proforma/new'}>
              <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained">
                Create Pro Forma
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
        message="Are you sure you want to delete this Proforma?"
      />
    </>
  );
}

export default OrderConfirmationPage;
function setFetchedData(data: any[]) {
  throw new Error('Function not implemented.');
}
