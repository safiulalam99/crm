import React from 'react';
import { Box, CardActions, Typography, Button } from '@mui/material';
import FormikControl from '../Formik/FormikControl';
import buyerData from '../../Data/buyer.json';
import sellerData from '../../Data/seller.json';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { Formik, useField } from 'formik';

const FormikRow = ({setFieldValue}) => {
  const [buyerField, buyerMeta, buyerHelpers] = useField('buyerData');
  const selectedBuyer = buyerField.value;
  const [sellerField, sellerMeta, sellerHelpers] = useField('sellerData');
  const selectedSeller = sellerField.value;
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
              options={buyerData}
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
              label="To: "
              name="sellerData"
              options={sellerData}
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

export default FormikRow;
