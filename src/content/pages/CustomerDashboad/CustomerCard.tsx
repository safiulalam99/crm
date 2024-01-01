import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
interface DetailCardProps {
  buyer_data: {
    buyer_address?: string;
    buyer_country?: string;
    buyer_vatnumber?: string;
    buyer_contractnumber?: string;
    buyer_contact_details?: string;
    buyer_contactperson?: string;
    buyer_email?: string;
    buyer_phone?: string;
    // buyer_avatar?: string;
    buyer_name?: string;
  };
}

const DetailCard: React.FC<DetailCardProps> = ({ buyer_data }) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Avatar
            src={'/profile-icon'}
            sx={{ marginRight: 2, width: 56, height: 56 }}
          />
          <Typography variant="h5">{buyer_data.buyer_name}</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Email
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Phone
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Shipping address
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Billing address
            </Typography>
            <Typography variant="body1">
              {buyer_data.buyer_address ? 'Same as shipping address' : ''}
            </Typography>
          </Grid>
          {/* Additional fields */}
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Country
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_country}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              VAT Number
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_vatnumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Contract Number
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_contractnumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Contact Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              {buyer_data.buyer_contact_details}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" gutterBottom>
              Contact Person
            </Typography>
            <Typography variant="body1">
              {buyer_data.buyer_contactperson}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
