import React from 'react';
import { useAtomValue } from 'jotai';
import { customerDashboardDetailsAtom } from 'src/atoms/atoms';
import { usefetchInvoicesCustomerForUser } from 'src/services/GET_CUSTOMER_DASHBOARD';
import Tables from 'src/components/DataTable';
import { Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { formatDate, convertToRealTime } from 'src/utils/formatDate';

const columns = [
  {
    field: 'invoicenumber',
    headerName: 'Invoice#',
    width: 130,
    renderCell: (params) => (
      <Link to={`/components/invoice/pdf/${params.row.invoice_id}`}>
        {params.value.toString()}
      </Link>
    )
  },
  {
    field: 'buyer_name',
    headerName: 'Customer',
    width: 130,
    renderCell: (params) => (
      <Link to={`/components/customers/edit/${params.row.buyer_id}`}>
        {params.value.toString()}
      </Link>
    )
  },  {
    field: 'total',
    headerName: 'Total',
    width: 100,
    renderCell: (params) =>
      `${params?.row.currency_symbol} ${params.value.toString()}`
  },
  { field: 'invoice_date', headerName: 'Date', width: 120 },
  {
    field: 'invoice_timestamp',
    headerName: 'Created at',
    width: 250,
    valueFormatter: (params) => convertToRealTime(params.value)
  } // Add more columns as needed
];

const InvoiceTable = () => {
  const customerDetails = useAtomValue(customerDashboardDetailsAtom);
  const {
    multiple_customer_invoices,
    multiple_customer_invoices_error,
    multiple_customer_invoices_isLoading
  } = usefetchInvoicesCustomerForUser(
    //  @ts-ignore
    customerDetails?.associated_invoices,
    //  @ts-ignore
    customerDetails?.buyerid
  );

  const rows =
    multiple_customer_invoices?.map((invoice) => ({
      id: invoice?.invoicenumber, // Ensure this is unique
      ...invoice
    })) || [];
  return (
    <div>
      {multiple_customer_invoices_isLoading ? (
        <SuspenseLoader />
      ) : multiple_customer_invoices_error ? (
        <div>Error</div> // Replace with your error message
      ) : (
        <>
          {/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}

          <Tables rows={rows} columns={columns} />
        </>
      )}
    </div>
  );
};

export default InvoiceTable;
