import React, { memo, useState } from 'react';
import { Box, CardActions, Typography, Button, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { Formik, useField } from 'formik';
import CreateCustomer from 'src/content/pages/CustomersPage/CreateCustomer';
import useBuyers from 'src/services/GET_buyers_data';
import useSellers from 'src/services/GET_seller_data';
import FormikControl from 'src/components/Formik/FormikControl';
import CreateSeller from '../CreateSeller';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const BuyerandSellerOptions = ({ setFieldValue }) => {
  const [buyerDrawerOpen, setBuyerDrawerOpen] = useState(false);
  const [sellerDrawerOpen, setSellerDrawerOpen] = useState(false);
  const [buyerField, buyerMeta, buyerHelpers] = useField('buyerData');
  const selectedBuyer = buyerField.value;
  const [sellerField, sellerMeta, sellerHelpers] = useField('sellerData');
  const selectedSeller = sellerField.value;

  
  const { buyers, error, isLoading, refreshBuyers } = useBuyers(); // Notice the new refreshBuyers function here
  const {
    sellers,
    error: sellerError,
    isLoading: sellerLoading,
    refreshSellers
  } = useSellers();

  const handleCloseDrawer = () => {
    setBuyerDrawerOpen(false);
  };
  const handleCloseSellerDrawer = () => {
    setSellerDrawerOpen(false);
  };
  
  
  // if (buyerLoading || sellerLoading) return <p>Loading...</p>;
  // if (buyerError) return <p>Error: {buyerError.message}</p>;
  if (sellerError) return <p>Error: {sellerError.message}</p>;

  const toggleDrawer = (drawer, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    if (drawer === 'buyer') {
      setBuyerDrawerOpen(open);
    } else {
      setSellerDrawerOpen(open);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box m={2}> {/* Add margin around the text */}</Box>
        <Card>
          <CardContent>
            <Grid container justifyContent="flex-end">
              <Drawer
                anchor="right"
                open={buyerDrawerOpen}
                onClose={toggleDrawer('buyer', false)}
                PaperProps={{
                  style: {
                    width: '70%'
                  }
                }}
              >
                <Grid container justifyContent="flex-start">
                  <Button onClick={toggleDrawer('buyer', false)}>
                    <ArrowBackIcon />
                    Close
                  </Button>
                </Grid>
                <CreateCustomer refreshBuyers={refreshBuyers} handleCloseDrawer={handleCloseDrawer} />
              </Drawer>
              <Button onClick={toggleDrawer('buyer', true)}>
                <AddIcon /> Create New Buyer
              </Button>
            </Grid>
            <FormikControl
              control="autocomplete"
              type="text"
              label="Buyer: "
              name="buyerData"
              options={buyers}
              getOptionLabel={(option: any) => option?.name}
              onChange={(event, value) => setFieldValue('buyerData', value)}
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
            <Grid container justifyContent="flex-end">
              <Drawer
                anchor="right"
                open={sellerDrawerOpen}
                onClose={toggleDrawer('seller', false)}
                PaperProps={{
                  style: {
                    width: '70%'
                  }
                }}
              >
                <Grid container justifyContent="flex-start">
                  <Button onClick={toggleDrawer('seller', false)}>
                    <ArrowBackIcon />
                    Close
                  </Button>
                </Grid>{' '}
                <CreateSeller refreshSellers={refreshSellers} handleCloseSellerDrawer={handleCloseSellerDrawer} />
              </Drawer>
              <Button onClick={toggleDrawer('seller', true)}>
                <AddIcon /> Edit Company Details
              </Button>
            </Grid>
            <FormikControl
              control="autocomplete"
              type="text"
              label="From: "
              name="sellerData"
              options={sellers}
              getOptionLabel={(option: any) => option?.name}
              onChange={(event, value) => setFieldValue('sellerData', value)}
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

export default memo(BuyerandSellerOptions);
