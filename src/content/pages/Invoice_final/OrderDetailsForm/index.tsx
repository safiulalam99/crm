import React from "react";
import { Field } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const OrderDetailsForm = ({ buyerData, vatTypes, values, setFieldValue }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Field
            required
            name="buyerData"
            as={Autocomplete}
            disablePortal
            options={buyerData}
            getOptionLabel={(option) => option.country}
            value={values.buyerData}
            onChange={(event, value) => setFieldValue("buyerData", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buyer"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            )}
            label="Buyer"
          />
        </Grid>
        <Grid item xs={2}>
          <Field
            name="vatType"
            as={Autocomplete}
            disablePortal
            options={vatTypes.vatTypes}
            getOptionLabel={(option) => option.label}
            value={values.vatType}
            onChange={(event, value) => setFieldValue("vatType", value)}
            renderInput={(params) => (
              <TextField {...params} label="Tax type" variant="outlined" />
            )}
            label="Buyer"
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="contractNumber"
            id="contractNumber"
            label="Contract number"
            value={values.contractNumber}
            as={TextField}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="deliveryTerm"
            id="deliveryTerm"
            label="Delivery Term"
            value={values.deliveryTerm}
            as={TextField}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            name="deliveryDate"
            id="deliveryDate"
            label="Delivery date"
            value={values.date}
            onChange={(value) => setFieldValue("deliveryDate", value)}
            as={DatePicker}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="paymentTerm"
            id="paymentTerm"
            label="Payment Term"
            value={values.paymentTerm}
            as={TextField}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderDetailsForm;
