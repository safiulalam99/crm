import React, { useState } from 'react';
import Header from './Header';
import OrderDetailsTable from './OrderDetailsTable';
import BankDetails from './BankDetails';
import CompanyDetails from './CompanyDetails';
import PaymentTerms from './PaymentTerms';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { atoms } from "../Home";
// import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import sellerData from '../../../data_fin/seller.json';
import buyers from '../../../data_fin/buyer.json';

// export const invoiceDataAtom = atom({});
const products = [
  {
    name: {
      id: 6,
      name: 'BF1005 |BIOFROST® RELIEF™ 3ml sachets|\r\n2400 per deliver box LOT/EXP DATE:2026\r\nSACHET WITH LANGUAGE VERSION: EN-DK-NO-ES-PT\r\n',
      description: '',
      category: '',
      price: 0,
      time_stamp: '2023-09-10T19:26:04.674175+00:00',
      defaultquantity: 0,
      maxquantity: 0,
      imageurl: '',
      status: 'active'
    },
    units: '02',
    productlot: 2,
    unitPrice: '023',
    unitVat: 0,
    unitTotal: 46
  },
  {
    id: 'lmfgn4e0clmebwd7yeh',
    name: {
      id: 2,
      name: 'Mouse Pad',
      description: 'Standard mouse pad',
      category: 'office supplies',
      price: 4.49,
      time_stamp: '2023-08-15T17:26:53.826163+00:00',
      defaultquantity: 0,
      maxquantity: 0,
      imageurl: null,
      status: 'deleted'
    },
    units: '02',
    unitPrice: 4.49,
    unitVat: 0,
    unitTotal: 8.98,
    productlot: 1
  },
  {
    id: 'lmfgn7qvnir3hvjck2s',
    name: {
      id: 6,
      name: 'BF1005 |BIOFROST® RELIEF™ 3ml sachets|\r\n2400 per deliver box LOT/EXP DATE:2026\r\nSACHET WITH LANGUAGE VERSION: EN-DK-NO-ES-PT\r\n',
      description: '',
      category: '',
      price: 0,
      time_stamp: '2023-09-10T19:26:04.674175+00:00',
      defaultquantity: 0,
      maxquantity: 0,
      imageurl: '',
      status: 'active'
    },
    units: '02',
    unitPrice: '1',
    unitVat: 0,
    unitTotal: 2,
    productlot: 2
  },
  {
    id: 'lmfgnd9fk0td4hrlgt',
    name: {
      id: 3,
      name: 'Laptop Stand',
      description: 'Adjustable laptop stand',
      category: 'office supplies',
      price: 24.99,
      time_stamp: '2023-08-15T17:26:53.826163+00:00',
      defaultquantity: 0,
      maxquantity: 0,
      imageurl: null,
      status: 'archived'
    },
    units: '10',
    unitPrice: 24.99,
    unitVat: 0,
    unitTotal: 249.9,
    productlot: 2
  }
];

const Invoice = () => {
  //   const buyerName = useAtomValue(invoiceDataAtom)?.buyerData;
  //   const headerDetails = useAtomValue(invoiceDataAtom);
  const [buyerName, setBuyerName] = useState('');
  const [headerDetails, setHeaderDetails] = useState('');
  //   console.log(`invoice data`,headerDetails)

  const buyer = buyers.filter((company) => company.id === '1')[0];
  // console.log(buyer)
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container
        className="invoice-component"
        maxWidth="md"
        sx={{ paddingTop: '64px' }}
      >
        <Header
          buyerData={buyerName}
          sellerData={sellerData}
          headerDetails={headerDetails}
        />
        <br />
        <OrderDetailsTable products={products} />
        <br />
        <BankDetails data={sellerData} />
        <br />
        <PaymentTerms />
      </Container>
    </React.Fragment>
  );
};

export default Invoice;
