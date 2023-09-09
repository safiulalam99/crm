import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box) ", 100, 1.15),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="spanning table">
        <TableHead sx={{ bgcolor: "#e1eaf7" }}>
          <TableRow>
            <TableCell sx={{ borderRight: "1px solid #ccc" }}>Desc</TableCell>
            <TableCell align="right" sx={{ borderRight: "1px solid #ccc" }}>
              Qty.
            </TableCell>
            <TableCell align="right" sx={{ borderRight: "1px solid #ccc" }}>
              Unit
            </TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                {row.desc}
              </TableCell>
              <TableCell align="right" sx={{ borderRight: "1px solid #ccc" }}>
                {row.qty}
              </TableCell>
              <TableCell align="right" sx={{ borderRight: "1px solid #ccc" }}>
                {row.unit}
              </TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
