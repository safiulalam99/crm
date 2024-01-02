import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  useTheme
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonIcon from '@mui/icons-material/Person';
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

const InfoItem: React.FC<{
  icon: React.ReactElement;
  label: string;
  value: string;
}> = ({ icon, label, value }) => {
  return (
    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Box>
        <Typography color="textSecondary" gutterBottom variant="subtitle2">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Grid>
  );
};

const DetailCard: React.FC<DetailCardProps> = ({ buyer_data }) => {
  const theme = useTheme();

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 1 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 0,
            paddingLeft: 1
          }}
        >
          <Avatar
            src={'/profile-icon'}
            sx={{ marginRight: 2, width: 56, height: 56 }}
          />
          <Typography variant="h5">{buyer_data.buyer_name}</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 1 }}>
              <CardContent>
                {/* Avatar and name */}

                {/* Contact details */}
                <Grid container spacing={2}>
                  <InfoItem
                    icon={<EmailIcon color="action" />}
                    label="Email"
                    value={buyer_data.buyer_email || 'N/A'}
                  />
                  <InfoItem
                    icon={<PhoneIcon color="action" />}
                    label="Phone"
                    value={buyer_data.buyer_phone || 'N/A'}
                  />
                  <InfoItem
                    icon={<LocationOnIcon color="action" />}
                    label="Shipping address"
                    value={buyer_data.buyer_address || 'N/A'}
                  />
                  <InfoItem
                    icon={<BusinessIcon color="action" />}
                    label="Billing address"
                    value={
                      buyer_data.buyer_address || 'Same as shipping address'
                    }
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Right-side card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                {/* Additional details */}
                <Grid container spacing={2}>
                  <InfoItem
                    icon={<PublicIcon color="action" />}
                    label="Country"
                    value={buyer_data.buyer_country || 'N/A'}
                  />
                  <InfoItem
                    icon={<AccountBalanceIcon color="action" />}
                    label="VAT Number"
                    value={buyer_data.buyer_vatnumber || 'N/A'}
                  />
                  <InfoItem
                    icon={<ContactsIcon color="action" />}
                    label="Contact Details"
                    value={buyer_data.buyer_contact_details || 'N/A'}
                  />
                  <InfoItem
                    icon={<PersonIcon color="action" />}
                    label="Contact Person"
                    value={buyer_data.buyer_contactperson || 'N/A'}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
