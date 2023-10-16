import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const BankAccountCard = ({ bankAccount }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        maxWidth: 500, 
        mx: 'auto', 
        borderRadius: 2, 
        boxShadow: 1 
      }} 
      variant="outlined"
    >
      <CardContent 
        sx={{ 
          textAlign: 'left' 
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Account Name: {bankAccount.bankaccountname}
        </Typography>
        <Typography>IBAN: {bankAccount.iban}</Typography>
        <Typography>Bank: {bankAccount.bankname}</Typography>
        <Typography>BIC: {bankAccount.bankbic}</Typography>
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;
