import { InputLabel, Autocomplete, TextField, Grid } from '@mui/material';
import { Field, ErrorMessage } from 'formik';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

interface FormikAutoCompleteProps<T> {
  label: string;
  name: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  labelLayout?: string;
  labelRequired?: boolean;
}

const FormikAutoComplete = <T,>(props: FormikAutoCompleteProps<T>) => {
  const {
    label,
    name,
    options,
    getOptionLabel,
    labelLayout: propLabelLayout,
    labelRequired,
    ...rest
  } = props;

  // Detect screen size
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Conditionally set labelLayout
  const labelLayout = propLabelLayout || (isSmallScreen ? 'top' : 'top');

  return (
    <Field name={name}>
      {({ field, form }) => (
        <>
          {labelLayout === 'left' ? (
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={3}>
                <div style={{ minWidth: '100px' }}>
                  <InputLabel style={{ color: '#5A5A5A' }} htmlFor={name}>
                    {label}
                    {labelRequired && (
                      <span style={{ color: 'red' }}> *</span>
                    )}{' '}
                    {/* add required indicator */}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={9}>
                <Autocomplete
                  {...rest}
                  options={options}
                  getOptionLabel={getOptionLabel}
                  id={name}
                  renderInput={(params) => (
                    <TextField 
                      {...params}
                      variant="outlined"
                      {...field}
                      {...rest}
                      error={Boolean(form.errors[name] && form.touched[name])}
                      helperText={<ErrorMessage name={name} />}
                    />
                  )}
                  onBlur={() => form.handleBlur(name)}
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
              <Autocomplete
                {...rest}
                options={options || []}
                getOptionLabel={getOptionLabel}
                id={name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    {...field}
                    {...rest}
                    error={Boolean(form.errors[name] && form.touched[name])}
                    helperText={<ErrorMessage name={name} />}
                  />
                )}
                onBlur={() => form.handleBlur(name)}
              />
            </>
          )}
        </>
      )}
    </Field>
  );
};

export default FormikAutoComplete;
