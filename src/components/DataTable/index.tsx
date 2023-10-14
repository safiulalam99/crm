import * as React from 'react';
import { Paper, TableContainer } from '@mui/material';
import { DataGrid, GridEventListener, GridColDef } from '@mui/x-data-grid';


export default function DataTable({ rows, columns, ...props }) {

  
  return (
    <div style={{ height: 400, width: '100%', justifyContent: "center" }}>
          <TableContainer component={Paper}>

      <DataGrid
      sx={{
        '.MuiDataGrid-columnHeaders': {
          backgroundColor: "rgba(235, 235, 235, .7)" ,
          color: 'black',
          fontWeight:"200",

        },
        '&.MuiDataGrid-root': {
          border: 'none',
          fontSize:16,
        },
        "& .MuiDataGrid-renderingZone": {
          "& .MuiDataGrid-row": {
           "&:nth-of-type(2n)": { 
              backgroundColor: "rgba(235, 235, 235, .7)" 
            }
          }
        },
        "& .MuiDataGrid-virtualScrollerRenderZone": {
          "& .MuiDataGrid-row": {
           "&:nth-of-type(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
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
        // checkboxSelection
        pageSizeOptions={[5, 10, 30, 50, 100]}
        {...props}
      />
      </TableContainer>
    </div>
  );
}
