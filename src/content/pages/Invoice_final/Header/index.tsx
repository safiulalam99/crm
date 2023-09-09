import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CompanyDetails from "../CompanyDetails";

import seller from "../../../../Data/seller.json";
import buyer from "../../../../Data/buyer.json";

const ItemRight = styled(Grid)(({ theme }) => ({
  textAlign: "right",
}));
const ItemLeft = styled(Grid)(({ theme }) => ({
  textAlign: "left",
}));
const Item = styled(Grid)(({ theme }) => ({
  textAlign: "right",
}));

const logoStyle = {
  maxWidth: "200px",
  maxHeight: "100px",
  width: "auto",
  height: "auto",
};

export default function Header({ sellerData, buyerData, headerDetails }) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} container>
          <ItemRight>
            <img src="../../../public/bio2.png" alt="My Image" style={logoStyle} />
            <Typography
              variant="h6"
              style={{ fontWeight: "bold" }}
              align="left"
              color="grey"
            >
              {sellerData.displayName}
            </Typography>
          </ItemRight>
        </Grid>
        <Grid item xs={6}>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              REFERENCE NUMBER: {headerDetails?.referenceNumber}
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              CONTRACT NO: {buyerData?.contractNumber}
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              DATE: {headerDetails?.date}
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              PAYMENT TERM: 50% WHEN ORDER
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              PLACED AND 50% AT PICK UP.
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              CURRENCY: EURO (€)
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              PRICES: 0% VAT (VAT EXCLUDED)
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              DELIVERY TERM: EXW-FI33470
            </Typography>
          </ItemRight>
          <ItemRight>
            <Typography variant="body2" gutterBottom>
              DELIVERY DATE: 28.02.2023
            </Typography>
          </ItemRight>
        </Grid>
        <CompanyDetails buyerData={buyerData} sellerData={sellerData} />
      </Grid>
    </Box>
  );
}
