import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function DataTable({ rows, columns }) {
  return (
    <div style={{ height: 400, width: '100%', justifyContent: "center" }}>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        checkboxSelection
        pageSizeOptions={[5, 10, 30, 50, 100]}
      />
    </div>
  );
}
