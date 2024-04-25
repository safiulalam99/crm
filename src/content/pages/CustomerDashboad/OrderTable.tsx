import { useAtomValue } from 'jotai';
import { customerDashboardDetailsAtom } from 'src/atoms/atoms';
import { useFetchOrderConfirmationsForUser } from 'src/services/GET_CUSTOMER_DASHBOARD';
import Tables from 'src/components/DataTable';
import { Link } from 'react-router-dom';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { convertToRealTime } from 'src/utils/formatDate';

const columns = [
  {
    field: 'invoicenumber',
    headerName: 'Invoice#',
    width: 130,
    renderCell: (params) => (
      <Link to={`/components/order_confirmation/pdf/${params.row.order_confirmation_id}`}>
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
  },
  {
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
    width: 200,
    valueFormatter: (params) => convertToRealTime(params.value)
  } // Add more columns as needed
];

const InvoiceTable = () => {
  const customerDetails = useAtomValue(customerDashboardDetailsAtom);
console.log(customerDetails)
  const {
    multiple_customer_order_confirmations,
    multiple_customer_order_confirmations_error,
    multiple_customer_order_confirmations_isLoading
  } = useFetchOrderConfirmationsForUser(
    //  @ts-ignore
    customerDetails?.associated_order_confirmations,
    //  @ts-ignore
    customerDetails?.buyerid
  );

  const rows =
    multiple_customer_order_confirmations?.map((invoice) => ({
      id: invoice?.invoicenumber, // Ensure this is unique
      ...invoice
    })) || [];

  return (
    <div>
      {multiple_customer_order_confirmations_isLoading ? (
        <SuspenseLoader />
      ) : multiple_customer_order_confirmations_error ? (
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
