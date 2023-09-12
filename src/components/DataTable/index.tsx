import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, TableContainer } from '@mui/material';

export default function DataTable({ rows, columns }) {
  return (
    <div style={{ height: 400, width: '100%', justifyContent: "center" }}>
          <TableContainer component={Paper}>

      <DataGrid
      sx={{
        '.MuiDataGrid-columnHeaders': {
          background: '#cdcfcc',
          color: 'black',
          fontWeight:"200",

        },
        '&.MuiDataGrid-root': {
          border: 'none',
          fontSize:16,
        },
        "& .MuiDataGrid-renderingZone": {
          "& .MuiDataGrid-row": {
            "&:nth-child(2n)": { 
              backgroundColor: "rgba(235, 235, 235, .7)" 
            }
          }
        },
        "& .MuiDataGrid-virtualScrollerRenderZone": {
          "& .MuiDataGrid-row": {
            "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
          }
        }
      }}
        autoHeight={true}
        filterMode='client'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        checkboxSelection
        pageSizeOptions={[5, 10, 30, 50, 100]}
      />
      </TableContainer>
    </div>
  );
}
