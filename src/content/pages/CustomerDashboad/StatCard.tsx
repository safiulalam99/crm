import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
// import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '@mui/material';

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

  export default StatCard;