import * as React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { InputLabel, TextField, Grid } from '@mui/material';
import { Field, ErrorMessage } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';

const FormikDatePicker = ({ label, name, labelLayout: propLabelLayout, ...rest }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const labelLayout = propLabelLayout || 'top';

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;
        const showError = form.errors[name] && form.touched[name];

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {labelLayout === 'left' ? (
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  <InputLabel style={{ color: '#5A5A5A' }} htmlFor={name}>
                    {label}
                  </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <DatePicker
                    value={value}
                    onChange={(date) => {
                      // Ensures the date is treated as UTC for all operations
                      const utcDate = dayjs(date).utc(true).startOf('day');
                      setFieldValue(name, utcDate);
                    }}
                    inputFormat='DD-MM-YYYY'
                    mask="##-##-####"  
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...rest}
                        error={showError}
                        helperText={showError && <ErrorMessage name={name} />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <InputLabel style={{ color: '#5A5A5A', marginBottom: '5px' }} htmlFor={name}>
                  {label}
                </InputLabel>
                <DatePicker
                  value={value}
                  onChange={(date) => {
                      const utcDate = dayjs(date).utc(true).startOf('day');
                      setFieldValue(name, utcDate);
                  }}
                  inputFormat='DD-MM-YYYY'
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      {...rest}
                      error={showError}
                      helperText={showError && <ErrorMessage name={name} />}
                    />
                  )}
                />
              </>
            )}
          </LocalizationProvider>
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
