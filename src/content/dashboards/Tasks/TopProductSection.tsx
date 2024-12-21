import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Card } from '@mui/material';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';

const TopProductsSection = ({ topproducts }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Top Products and Revenue
      </Typography>
      <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>

      <List>
        {topproducts ? (
          topproducts.map((product, index) => (
            <ListItem key={index} disableGutters>
              <ListItemAvatar>
                <Avatar>
                  <ShoppingBagTwoToneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1">{product.name}</Typography>
                }
                secondary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="caption" color="green">
                      Sales: {product.total_sales}
                    </Typography>
                    <Typography color="green" variant="caption">
                      Revenue: €{product.total_revenue}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))
        ) : (
            <Typography variant="body2">No top products data available.</Typography>
        )}
      </List>
      </Card>
    </>
  );
};

export default TopProductsSection;
