import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

// Define the interface for the accounting data
interface AccountingData {
  name: string;
  total_sales: number;
  total_revenue: number;
}

// Define the props for the Dashboard component
interface DashboardProps {
  data: AccountingData[];
}

// The DashboardTile component represents a single data entry
const DashboardTile: React.FC<{ data: AccountingData }> = ({ data }) => {
  return (
    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
      <ListItemText
        primary={data.name}
        primaryTypographyProps={{
          fontWeight: 'bold',
          color: 'primary',
          variant: 'body2'
        }}
        secondary={`Sales: ${data.total_sales}`}
        secondaryTypographyProps={{
          variant: 'caption'
        }}
      />
      <Typography variant="body2" color="textSecondary" fontWeight={2}>
        ${data.total_revenue}
      </Typography>
    </ListItem>
  );
};

// The Dashboard component
const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 300, mx: 'auto', my: 2, boxShadow: 3 }}>
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', pb: 1 }}>
          Top Products
        </Typography>
        <Divider />
        <List dense>
          {data.map((entry, index) => (
            <React.Fragment key={index}>
              <DashboardTile data={entry} />
              {index < data.length - 1 && <Divider variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
