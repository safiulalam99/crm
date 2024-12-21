import { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Container, useTheme } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import useTopproducts from 'src/services/GET_product_metrics';

import MyResponsiveChoropleth from './MapVisual';
import useSalesByCountry from 'src/services/functions/get_sales_by_country';

function DashboardTasks() {
  const { topproducts, error } = useTopproducts();
  const {
    salesData,
    error: salesError,
    isLoading: salesLoading
  } = useSalesByCountry();
  if (error || salesError) {
    console.error('Error fetching', error);
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <MyResponsiveChoropleth data={salesData} />
      <Container maxWidth="lg" style={{ paddingBottom: 30 }}>
        {/* {topproducts && topproducts.length > 0 ? (
          <TopProducts data={topproducts} />
        ) : (
          <Typography variant="h6">No top products data available.</Typography>
        )} */}
      </Container>
    </>
  );
}

export default DashboardTasks;
