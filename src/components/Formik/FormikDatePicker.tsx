import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputLabel, TextField, Grid } from '@mui/material';
import { Field, ErrorMessage } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';

const FormikDatePicker = (props) => {
  const { label, name, labelLayout: propLabelLayout, ...rest } = props;

  // Detect screen size
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Conditionally set labelLayout
  const labelLayout = propLabelLayout || (isSmallScreen ? 'top' : 'top');

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;

        return (
          <>
            {labelLayout === 'left' ? (
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  <div style={{ minWidth: '100px' }}>
                    <InputLabel
                      style={{ color: '#5A5A5A' }}
                      htmlFor={name}
                    >
                      {label}
                    </InputLabel>
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <DatePicker
                    value={value}
                    onChange={(date) => setFieldValue(name, date)}
                    onError={form.errors[name] && form.touched[name]}
                    inputFormat='dd-MM-yyyy'
                    mask="##-##-####"  
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...rest}
                        error={form.errors[name] && form.touched[name]}
                        helperText={<ErrorMessage name={name} />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <InputLabel
                  style={{ color: '#5A5A5A', marginBottom: '5px' }}
                  htmlFor={name}
                >
                  {label}
                </InputLabel>
                <DatePicker
                  value={value}
                  onChange={(date) => setFieldValue(name, date)}
                  onError={form.errors[name] && form.touched[name]}
                  inputFormat='dd-MM-yyyy'
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      {...rest}
                      error={form.errors[name] && form.touched[name]}
                      helperText={<ErrorMessage name={name} />}
                    />
                  )}
                />
              </>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
