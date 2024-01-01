import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
// import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface StatCardProps {
  title: string;
  value: string;
  total: string;
  percentageChange: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, total, percentageChange }) => {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'inline-flex', margin: theme.spacing(1), minWidth: 200 }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontSize: 22, fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography color="textSecondary">
          {total}
        </Typography>
   
      </CardContent>
    </Card>
  );
};
// Mock data for various components
const userRows = [
  { name: 'John Doe', location: 'USA', email: 'johndoe@example.com', phone: '555-1234' },
  // ... more users
];
const visitorLocations = [
  { country: 'United States', visits: 14536 },
  // ... more locations
];
const audienceData = {
  labels: ['Male', 'Female', 'Others'],
  datasets: [
    {
      label: 'Audience',
      data: [2170000, 1820000, 240000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  // Using mock data for now, replace with actual data fetching logic
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Summary Cards */}
      <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={3}>
    <StatCard
      title="New Visitor"
      value="162.9K"
      total="Total 659.45K Visitors"
      percentageChange={10.1}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <StatCard
      title="Active Users"
      value="47.23K"
      total="Total 123.45K Users"
      percentageChange={-5}
    />
  </Grid>
  {/* ... other cards */}
</Grid>

      {/* ... Summary Cards as previously outlined */}
      
      {/* Main Content */}
      <Grid item xs={12} md={8}>
        {/* Chart */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Daily Visitors</Typography>
          <Box sx={{ height: 300 }}>
            <CircularProgress /> {/* Placeholder for chart component */}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        {/* Visitor Locations */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Visitor Locations</Typography>
          <List>
            {visitorLocations.map((location, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={location.country} secondary={`Visits: ${location.visits}`} />
                </ListItem>
                {index < visitorLocations.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>
      
      {/* Users Table */}
      <Grid item xs={12}>
        <Paper>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Email Address</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      
      {/* Audience Doughnut Chart */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Audience</Typography>
          <Box sx={{ height: 300 }}>
            {/* <Doughnut data={audienceData} />  */}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
