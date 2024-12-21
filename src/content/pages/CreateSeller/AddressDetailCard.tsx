import React from 'react';
import { Card, Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const AddressDetailCard = ({ detail, selected, onSelect, onDelete }) => {
    return (
      <Card
        sx={{
          mb: 2,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 2,
          borderColor: selected ? 'primary.main' : 'divider',
          borderRadius: '10px',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '.delete-icon': { opacity: 1, top: 8, right: 8 }
          }
        }}
        onClick={onSelect}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {selected && (
            <CheckCircleIcon
              color="primary"
              sx={{
                position: 'absolute',
                top: -8,
                left: -8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                borderRadius: '60%',
                p: 0.1,
                border: 2,
                borderColor: 'primary.main'
              }}
            />
          )}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {detail?.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Country: {detail?.country}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent onSelect when clicking the delete button
            onDelete();
          }}
          color="error"
          size="large"
          className="delete-icon"
          sx={{ opacity: 0, transition: 'opacity 0.3s' }}
        >
          <CloseIcon />
        </IconButton>
      </Card>
    );
  };
export default AddressDetailCard;
