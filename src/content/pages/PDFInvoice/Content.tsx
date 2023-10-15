import React from 'react';
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    padding: 25,
    color: '#827f7f'
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#827f7f'
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#827f7f',

  },
  content: {
    marginBottom: 10,
    fontSize: 10
  },
  nospacecontent: {
    fontSize: 10
  },
  pageFooter: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  footer: {
    position: 'absolute',
    fontSize: 11,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#42aed9'
  }
});

const Invoice = () => {
  return (
    <Page size="A4" style={styles.body}>
      <Text style={styles.header}>GENERAL TERMS AND CONDITIONS OF SALE</Text>

      <Text style={styles.title}>ORDER CONFIRMATION</Text>
      <Text style={styles.content}>
        On receipt of an order via telephone or e-mail, Seller will provide an
        Order Confirmation within 5 working days. The Order Confirmation will
        confirm the contract between Buyer and Manufacturer. Order Confirmation
        document need to be signed and stamped by Buyer within 5 working days.
      </Text>

      <Text style={styles.title}>PACKAGING INFO</Text>
      <Text style={styles.nospacecontent}>
        Tube 100ml with carton box | 90 units in delivery box (38 x 27.5 x
        30cm)
      </Text>
      <Text style={styles.nospacecontent}>
        Roll on 75ml with carton box | 87 units in delivery box (38 x 27.5 x 30cm)
      </Text>
      <Text style={styles.nospacecontent}>
        Sachets 3ml | 2400 units in deliver box (38 x 27.5 x 30cm)
      </Text>
      <Text style={styles.nospacecontent}>
        Pump 500ml | 22 units in deliver box (38 x 27.5 x 30cm)
      </Text>

      <Text style={styles.content}></Text>
      <Text style={styles.title}>DELIVERY TERMS</Text>
      <Text style={styles.content}>
        Delivery term is EXW (Viking Lab warehouse: VANHA VAASANTIE 8 C,
        FI-33470 YLÖJÄRVI, FINLAND)
      </Text>

      <Text style={styles.title}>PRICES</Text>
      <Text style={styles.content}>
        All the prices displayed are in Euros. Under unusual circumstances,
        Seller reserves the right to raise or reduce a price in accordance with
        changes in product development expenses, freight cost or other handling
        fees.
      </Text>

      <Text style={styles.title}>IMPORT TERMS</Text>
      <Text style={styles.content}>
        Buyer shall be responsible for complying with any legislation or
        regulations governing the importation of the Goods into the country of
        destination and for the payment of any duties on them and for notifying
        the Seller in writing of any importation requirements.
      </Text>

      <Text style={styles.title}>DELIVERY TIME AND DELAYS</Text>
      <Text style={styles.content}>
        Production will begin within a reasonable time following the entry of
        the order, lead time 4-12 weeks (depending on the order quantity and
        stock quantity). The notice period is 8 days after order. If the order
        is canceled before the shipment, the buyer is required to pay 50 % of
        the order value. When the Seller discovers that the Seller is unable to
        comply with the agreed delivery time or such a delay seems probable, the
        Seller must inform the Customer of the reason for the delay and a new
        delivery time in writing and without delay.
      </Text>

      <Text style={styles.title}>PAYMENT</Text>
      <Text style={styles.content}>
        Payment must be in EUR currency. Invoice shall be paid in Viking
        Lab Oy’s bank account in Finland.
      </Text>

      <Text style={styles.title}>FORCE MAJEURE</Text>
      <Text style={styles.content}>
        Event refers to such an exceptional and influential event that it
        prevents fulfilling the contract correctly; that has occurred after
        signing the contract; that is independent of the Parties; and that is
        something the Parties could not have considered when concluding the
        contract nor prevent it without undue additional costs or unreasonable
        waste of time. Such an occurrence may be, for example, war, rebellion,
        internal unrest, confiscation by an authority or seizure for the public
        good, bans on import and export, natural phenomena, termination of
        public transportation or energy supply, extensive labor dispute or fire
        or some other equally effective and exceptional reason which is
        independent of the Parties.
      </Text>
      <Text style={styles.footer}>
        OUR VISION AT BIOFROST IS TO BE THE MOST RESPECTED COLD THERAPY BRAND IN
        THE WORLD
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

export default Invoice;
