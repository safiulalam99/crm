import React from 'react';
import { Box, CardActions, Typography, Button } from '@mui/material';
import FormikControl from '../Formik/FormikControl';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { Formik, useField } from 'formik';
import useBuyers from '../../services/GET_buyers_data'; // Adjust the path to your hook
import useSellers from '../../services/GET_seller_data'; // Adjust the path to your hook
import useProducts from '../../services/GET_PRODUCTS'; // Adjust the path to your hook

const Header2 = ({setFieldValue}) => {
  const { buyers, error: buyerError, isLoading: buyerLoading } = useBuyers();
  const { sellers, error: sellerError, isLoading: sellerLoading } = useSellers();

  const [buyerField, buyerMeta, buyerHelpers] = useField('buyerData');
  const selectedBuyer = buyerField.value;
  const [sellerField, sellerMeta, sellerHelpers] = useField('sellerData');
  const selectedSeller = sellerField.value;

  if (buyerLoading || sellerLoading) return <p>Loading...</p>;
  if (buyerError) return <p>Error: {buyerError.message}</p>;
  if (sellerError) return <p>Error: {sellerError.message}</p>;


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box m={2}> {/* Add margin around the text */}</Box>
        <Card>
          <CardContent>
            <FormikControl
              control="autocomplete"
              type="text"
              label="To: "
              name="buyerData"
              options={buyers}
              getOptionLabel={(option: any) => option?.name}
              onChange={(event, value) => setFieldValue("buyerData", value)}

            />
          </CardContent>
          <CardContent>
            {selectedBuyer && Object.keys(selectedBuyer).length > 0 && (
              <>
                <Typography variant="h6">
                  {' '}
                  <b> {selectedBuyer.name}</b>
                </Typography>
                <Typography> {selectedBuyer?.address}</Typography>
                <Typography> {selectedBuyer?.country}</Typography>
                <Typography>{selectedBuyer?.representative}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box m={2}></Box>
        <Card>
          <CardContent>
            <FormikControl
              control="autocomplete"
              type="text"
              label="From: "
              name="sellerData"
              options={sellers}
              getOptionLabel={(option: any) => option?.name}
              onChange={(event, value) => setFieldValue("sellerData", value)}

            />
          </CardContent>
          <CardContent>
            {selectedSeller && Object.keys(selectedSeller).length > 0 && (
              <>
                <Typography variant="h6">
                  {' '}
                  <b> {selectedSeller.name}</b>
                </Typography>
                <Typography> {selectedSeller.address}</Typography>
                <Typography> {selectedSeller.city}</Typography>
                <Typography>{selectedSeller.postalCode}</Typography>
                <Typography> {selectedSeller.country}</Typography>
                <Typography>{selectedSeller.managingDirector}</Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Header2;
