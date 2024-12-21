import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Formik, Field, FieldArray, Form } from "formik";

const Meta = ({ values, setFieldValue }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Meta
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Field
            name="invoiceNumber"
            id="outlined-required"
            label="Invoice Number"
            value={values.invoiceNumber}
            as={TextField}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            required
            name="date"
            id="outlined-required"
            label="Date"
            value={values.date}
            onChange={(value) => setFieldValue("date", value)}
            as={DatePicker}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="referenceNumber"
            id="referenceNumber"
            label="Reference number"
            value={values.referenceNumber}
            as={TextField}
          />
        </Grid>
        <Grid item xs={3}>
          <Field
            name="currency"
            id="currency"
            label="Currency"
            value={values.currency.name}
            as={TextField}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Meta;
