import React from 'react';
import { useAtomValue } from 'jotai';
import { customerDashboardDetailsAtom } from 'src/atoms/atoms';
import { useFetchProformasForUser, usefetchInvoicesCustomerForUser } from 'src/services/GET_CUSTOMER_DASHBOARD';
import Tables from 'src/components/DataTable';
import { Link } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { formatDate } from 'src/utils/formatDate';

const columns = [
    {
      field: 'invoicenumber',
      headerName: 'Invoice#',
      width: 130,
      renderCell: (params) => (
        <Link to={`/components/proforma/pdf/${params.value}`}>
          {params.value.toString()}
        </Link>
      )
    },
    {
      field: 'buyer_name',
      headerName: 'Customer',
      width: 130,
      renderCell: (params) => (
        <Link to={`/components/customers/edit/${params.row.proforma_id}`}>
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
    { field: 'proforma_date', headerName: 'Date', width: 120 },
    {
      field: 'proforma_timestamp',
      headerName: 'Created at',
      width: 200,
      valueFormatter: (params) => formatDate(params.value)
    } // Add more columns as needed
  ];

const InvoiceTable = () => {
  const customerDetails = useAtomValue(customerDashboardDetailsAtom);

  const {
    multiple_customer_proformas,
    multiple_customer_proformas_error,
    multiple_customer_proformas_isLoading,
  } = useFetchProformasForUser(
    //  @ts-ignore
    customerDetails?.associated_proformas,
    //  @ts-ignore
    customerDetails?.buyerid
  );

  const rows = multiple_customer_proformas?.map(invoice => ({
    id: invoice?.proforma_id, // Ensure this is unique
    ...invoice
  })) || [];
  
  return (
    <div>
      {multiple_customer_proformas_isLoading ? (
        <SuspenseLoader />      ) : multiple_customer_proformas_error ? (
        <div>Error</div> // Replace with your error message
      ) : (
        <>
        <Tables rows={rows} columns={columns} />
        </>
      )}
    </div>
  );
};

export default InvoiceTable;
