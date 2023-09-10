import React, { useState } from "react";
import Header from "./Header";
import OrderDetailsTable from "./OrderDetailsTable";
import BankDetails from "./BankDetails";
import CompanyDetails from "./CompanyDetails";
import PaymentTerms from "./PaymentTerms";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import { atoms } from "../Home";
// import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import sellerData from "../../../data_fin/seller.json";
import buyers from "../../../data_fin/buyer.json";

// export const invoiceDataAtom = atom({});



const Invoice = () => {

//   const buyerName = useAtomValue(invoiceDataAtom)?.buyerData;
//   const headerDetails = useAtomValue(invoiceDataAtom);
const [buyerName, setBuyerName ] = useState("")
const [headerDetails, setHeaderDetails ] = useState("")
//   console.log(`invoice data`,headerDetails)

  const buyer = buyers.filter((company) => company.id === "1")[0];
// console.log(buyer)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="invoice-component" maxWidth="md" sx={{ paddingTop: "64px" }}>
        <Header buyerData={buyerName} sellerData={sellerData} headerDetails={headerDetails} />
        <br />
        <OrderDetailsTable />
        <br />
        <BankDetails data={sellerData} />
        <br />
        <PaymentTerms />
      </Container>
    </React.Fragment>
  );
};

export default Invoice;
