import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const GeneralTermsAndConditions = () => {
  return (
    <Container maxWidth="md">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          General Terms and Conditions of Sale
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Order Confirmation
          </Typography>
          <Typography variant="body1">
            On receipt of an order via telephone or e-mail, Seller will provide
            an Order Confirmation within 48 hours. The Order Confirmation will
            confirm the contract between Buyer and Seller. Order Confirmation
            document need to be signed by Buyer.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Packaging Info
          </Typography>
          <Typography variant="body1">
            Tube 100ml tube with carton box|90 units in delivery box (38 * 27,5
            * 30cm) Roll on 75ml with carton box|87 units in delivery box (38 *
            27,5 * 30cm) Sachets 3ml | 2400 units in deliver box (38 * 27,5 *
            30cm) 500ml pump bottle |22 units in delivery box (38 * 27,5 * 30cm)
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Delivery Terms{' '}
          </Typography>
          <Typography variant="body1">
            Delivery term is EXW (Viking Lab warehouse: MENOTIE 1b, FI-33470
            YLÖJÄRVI, FINLAND)
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Prices{' '}
          </Typography>
          <Typography variant="body1">
            All the prices displayed are in Euros. Under unusual circumstances,
            Seller reserves the right to raise or reduce a price in accordance
            with changes in product development expenses, freight cost or other
            handling fees.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Import Terms{' '}
          </Typography>
          <Typography variant="body1">
            BProduction will begin within a reasonable time following the entry
            of the order, lead time 2-8 weeks (depending on the order quantity
            and stock quantity). The notice period is 8 days after order. If the
            order is canceled before the shipment, the buyer is required to pay
            50 % of the order value. When the Seller discovers that the Seller
            is unable to comply with the agreed delivery time or such a delay
            seems probable, the Seller must inform the Customer of the reason
            for the delay and a new delivery time in writing and without delay.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Delivery Time And Delays{' '}
          </Typography>
          <Typography variant="body1">
            Buyer shall be responsible for complying with any legislation or
            regulations governing the importation of the Goods into the country
            of destination and for the payment of any duties on them and for
            notifying the Seller in writing of any importation requirements.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Payment{' '}
          </Typography>
          <Typography variant="body1">
            Payment must be in EUR currency, in cash at the place where Viking
            Lab is based or by transfer into a bank. Terms of payment: Payment
            in advance
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Force Majeure{' '}
          </Typography>
          <Typography variant="body1">
            Event refers to such an exceptional and influential event that it
            prevents fulfilling the contract correctly; that has occurred after
            signing the contract; that is independent of the Parties; and that
            is something the Parties could not have considered when concluding
            the contract nor prevent it without undue additional costs or
            unreasonable waste of time. Such an occurrence may be, for example,
            war, rebellion, internal unrest, confiscation by an authority or
            seizure for the public good, bans on import and export, natural
            phenomena, termination of public transportation or energy supply,
            extensive labor dispute or fire or some other equally effective and
            exceptional reason which is independent of the Parties.
          </Typography>
        </Box>
        {/* Other sections can be added here in a similar manner */}
      </Box>
    </Container>
  );
};

export default GeneralTermsAndConditions;
