import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, InputLabel, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const FormikInput = (props) => {
  const {
    label,
    name,
    labelLayout: propLabelLayout,
    labelRequired,
    ...rest
  } = props;

  // Detect screen size
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Conditionally set labelLayout
  const labelLayout = propLabelLayout || (isSmallScreen ? 'top' : 'top');

  // Append red asterisk if label is required
  const formattedLabel = labelRequired ? `${label} ` : label;

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            {labelLayout === 'left' ? (
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={3}>
                  <InputLabel
                    style={{ color: '#5A5A5A', marginBottom: '5px' }}
                    htmlFor={name}
                  >
                    <span>
                      {label}
                      {labelRequired && <span style={{ color: 'red' }}> *</span>}
                    </span>
                  </InputLabel>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    id={name}
                    {...field}
                    {...rest}
                    value={field.value}
                    error={form.errors[name] && form.touched[name]}
                    helperText={<ErrorMessage name={name} />}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <InputLabel
                  style={{ color: '#5A5A5A', marginBottom: '5px' }}
                  htmlFor={name}
                >
                  <span>
                    {label}
                    {labelRequired && <span style={{ color: 'red' }}>*</span>}
                  </span>
                </InputLabel>
                <TextField
                  fullWidth
                  id={name}
                  {...field}
                  {...rest}
                  value={field.value}
                  error={form.errors[name] && form.touched[name]}
                  helperText={<ErrorMessage name={name} />}
                />
              </>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default FormikInput;
