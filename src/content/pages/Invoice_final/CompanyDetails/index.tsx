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
  textAlign: "right",
}));

const CompanyDetails = ({ buyerData, sellerData }) => {
  return (
    <>
      {/* company details */}
      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          BUYER
        </Typography>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            {buyerData?.name}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            {buyerData?.address}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            {buyerData?.CountryCode}
            {buyerData?.postalCode}, {buyerData?.country}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            VAT NO:
            {buyerData?.vatNumber}
          </Typography>
        </ItemLeft>
        <ItemLeft>
          <Typography variant="body2" gutterBottom>
            MANAGING DIRECTOR:
            {buyerData?.managingDirector}
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
            {sellerData.name}
          </Typography>
        </ItemRight>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            {sellerData.address}
          </Typography>
        </ItemRight>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            VAT No: {sellerData.vatNumber}
          </Typography>
        </ItemRight>
        <ItemRight>
          <Typography variant="body2" gutterBottom>
            Managing Director: {sellerData.managingDirector}
          </Typography>
        </ItemRight>
      </Grid>
    </>
  );
};

export default CompanyDetails;
