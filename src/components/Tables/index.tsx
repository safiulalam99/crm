import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

const columns: GridColDef[] = [
  {
    field: 'time_stamp',
    headerName: 'Created at',
    width: 200,
    valueFormatter: (params) => formatDate(params.value)
  },
  { field: 'invoicenumber', headerName: 'Invoice#', width: 130 },
  { field: 'name', headerName: 'Customer', width: 130 }, 
  { field: 'deliverydate', headerName: 'Due Date', width: 130 },
  { field: 'total', headerName: 'Amount', width: 90 }
];

export default function DataTable(props) {
  // Convert the props data to the format DataGrid expects
  const rows = props.data.map((item) => ({
    id: item.invoicenumber,
    time_stamp: item.time_stamp,
    invoicenumber: item.invoicenumber,
    name: item.buyers.name,
    deliverydate: item.deliverydate,
    total: item.total
  }));

  return (
    <div style={{ height: 400, width: '70%',justifyContent: "center" }}>
      <DataGrid
      autoHeight={true}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
