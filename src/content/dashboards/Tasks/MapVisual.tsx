import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { GeoFeatures } from './GeoFeatures';

import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Select,
  Container,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper
} from '@mui/material';
import CountrySaleTable from './CountrySaleTable';
import useCustomerTotalsByCountry from 'src/services/functions/get_customers_and_totals_by_country';
import { useNavigate } from 'react-router-dom';

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
  const getDimensions = () => {
    return {
      width: targetRef?.current ? targetRef?.current?.offsetWidth : 0,
      height: targetRef?.current ? targetRef?.current?.offsetHeight : 0
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};

const DashboardCard = ({ data }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(mapContainerRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    data: customerTotals,
    isLoading,
    error
  } = useCustomerTotalsByCountry(selectedCountry?.data?.country || '');

  const handleCountryClick = (country) => {
  if (!country?.data) {
    setSelectedCountry(null);
    setOpen(false); 
  } else {
    setSelectedCountry(country);
    setOpen(true);
  }
};


  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };
  return (
    <Container maxWidth="md">
      <Card raised style={{ height: '100%' }}>
        <CardHeader variant="h3" title="Sales Revenue by Country" />
        <CardContent>
          <div ref={mapContainerRef} style={{ height: '450px', width: '100%' }}>
            {dimensions.width && (
              <ResponsiveChoropleth
                data={data}
                features={GeoFeatures.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors="blues"
                domain={[0, 200]}
                unknownColor="#f2f5f9"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={dimensions.width / 8}
                projectionTranslation={[0.5, 0.7]}
                projectionRotation={[-11, 0, 0]}
                borderWidth={0.1}
                borderColor="#223354"
                onClick={handleCountryClick}
              />
            )}
          </div>
        </CardContent>
        <CountrySaleTable data={data} />
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 2
            }}
          >
            <Box
              component="img"
              src={
                selectedCountry?.data?.file_url.startsWith('//')
                  ? `https:${selectedCountry?.data?.file_url}`
                  : selectedCountry?.data?.file_url
              }
              alt={selectedCountry?.data?.country}
              sx={{ width: 100, height: 'auto' }}
            />
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
              {' '}
              <Typography variant="h3">
                {selectedCountry?.data?.country}
              </Typography>
              <Box>

              <Typography variant="h4" sx={{ color: 'primary' }}>
               <span style={{color:'grey'}}>Total: </span> {selectedCountry?.data?.value?.toFixed(2) || 'No Sales'}
              </Typography>
              </Box>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="right">Net Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerTotals?.map((customer) => (
                  <TableRow
                    key={customer.id}
                    hover
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                    onClick={() =>
                      navigate(`/components/customers/view/${customer.id}`)
                    }
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1">
                        {customer.customer_name}
                      </Typography>
                      <Typography variant="body2">
                        {customer.contact_person}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        <b>{customer?.net_total?.toFixed(2)}</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DashboardCard;
