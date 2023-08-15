import React from 'react';
import { Paper, Typography, Grid, Button } from '@mui/material';

const TermsAndConditions: React.FC = () => {
    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        GENERAL TERMS AND CONDITIONS OF SALE
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">ORDER CONFIRMATION</Typography>
                    <Typography>
                        Details of the order confirmation...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">PACKAGING INFO</Typography>
                    <Typography>
                        Details of the packaging information...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">DELIVERY TERMS</Typography>
                    <Typography>
                        Details of the delivery terms...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">PRICES</Typography>
                    <Typography>
                        Details of the pricing information...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">IMPORT TERMS</Typography>
                    <Typography>
                        Details of the import terms...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">PAYMENT</Typography>
                    <Typography>
                        Payment details...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">FORCE MAJEURE</Typography>
                    <Typography>
                        Details about force majeure...
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography align="center">
                        OUR VISION AT BIOFROST IS TO BE THE MOST RESPECTED COLD THERAPY BRAND IN THE WORLD
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TermsAndConditions;
