import React from 'react';
import TextField from '@mui/material/TextField';
import { Grid, Container, Box } from '@mui/material';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import FormikInput from 'src/components/Formik/FormikInput';
import FormikContainer from 'src/components/FormikV2/FormikContainerV2';

function NewInvoice() {
  return (
    <>
      <Container>
        <Box m={2}></Box>
        <h1>Create V2</h1>
        &nbsp;
        <Container style={{ background: 'white' }} maxWidth="lg">
          <FormikContainer />
        </Container>
      </Container>
    </>
  );
}

export default NewInvoice;
