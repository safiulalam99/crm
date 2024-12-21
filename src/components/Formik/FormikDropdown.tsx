import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Field, ErrorMessage } from 'formik';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid
} from '@mui/material';

const FormikSelect = (props) => {
  const {
    label,
    name,
    options,
    labelLayout: propLabelLayout,
    labelRequired,
    ...rest
  } = props; // add labelRequired

  // Detect screen size
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // Conditionally set labelLayout
  const labelLayout = propLabelLayout || (isSmallScreen ? 'top' : 'top');

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
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
                  <FormControl
                    error={form.errors[name] && form.touched[name]}
                    fullWidth
                  >
                    <Select id={name} {...field} {...rest} fullWidth>
                      {/* <MenuItem value="">None</MenuItem> */}
                      {options.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      <ErrorMessage name={name} />
                    </FormHelperText>
                  </FormControl>
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
                <FormControl
                  error={form.errors[name] && form.touched[name]}
                  fullWidth
                >
                  <Select id={name} {...field} {...rest} fullWidth>
                    {/* <MenuItem value="">None</MenuItem> */}
                    {options.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    <ErrorMessage name={name} />
                  </FormHelperText>
                </FormControl>
              </>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default FormikSelect;
