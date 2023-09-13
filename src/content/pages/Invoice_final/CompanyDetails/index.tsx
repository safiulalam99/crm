import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ItemLeft = styled(Grid)(({ theme }) => ({
  textAlign: "left",
}));

const ItemRight = styled(Grid)(({ theme }) => ({
  textAlign: "left",
}));

const CompanyDetails = ({ invoiceData }) => {
  return (
    <>
      {/* company details */}
      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          To
        </Typography>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            <b>Company: </b>{invoiceData?.buyers.name}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
           <b>Address:</b> {invoiceData?.buyers.address}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            <b>Country: </b>{invoiceData?.buyers.country}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            <b>VAT Number: </b>
            {invoiceData?.buyers.vatnumber}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
          <b>Representative: </b>
            {invoiceData?.buyers.representative}
          </Typography>
        </ItemLeft>
      </Grid>
      <Grid item xs={4} />

      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          SELLER
        </Typography>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            {invoiceData?.sellers.name}
          </Typography>
        </ItemRight>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            {invoiceData?.sellers.address}
          </Typography>
        </ItemRight>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            VAT No: {invoiceData?.sellers.vatnumber}
          </Typography>
        </ItemRight>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            Managing Director: {invoiceData?.sellers.managingdirector}
          </Typography>
        </ItemRight>
      </Grid>
    </>
  );
};

export default CompanyDetails;
