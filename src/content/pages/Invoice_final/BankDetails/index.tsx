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

const BankDetails = ({data}) => {
  return (
    <>
      {/* company details */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              SELLER
            </Typography>
            <ItemLeft>
              <Typography variant="body2" gutterBottom>
                {data.name}
              </Typography>
            </ItemLeft>
            <ItemLeft>
              <Typography variant="body2" gutterBottom>
                {data.address}
              </Typography>
            </ItemLeft>
            <ItemLeft>
            </ItemLeft>
            <ItemLeft>
              <Typography variant="body2" gutterBottom>
                VAT NO:
                {data.vatNumber}
              </Typography>
            </ItemLeft>
            <ItemLeft>
              <Typography variant="body2" gutterBottom>
                Managing Director:
                {data.managingDirector}
              </Typography>
            </ItemLeft>
          </Grid>
          <Grid item xs={4} />

          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              BANK DETAILS
            </Typography>
            <ItemRight>
              <Typography variant="body2" gutterBottom>
                Name: {data.name}
              </Typography>
            </ItemRight>
            <ItemRight>
              <Typography variant="body2" gutterBottom>
                IBAN: {data.bankDetails.IBAN}
              </Typography>
            </ItemRight>
            <ItemRight>
              <Typography variant="body2" gutterBottom>
                BIC: {data.bankDetails.BIC}
              </Typography>
            </ItemRight>
            <ItemRight>
              <Typography variant="body2" gutterBottom>
                Bank: {data.bankDetails.BANK}
              </Typography>
            </ItemRight>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BankDetails;
