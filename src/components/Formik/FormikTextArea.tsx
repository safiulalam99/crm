import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, InputLabel, Grid, useMediaQuery } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f'
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 24px ${
      theme.palette.mode === 'dark' ? blue[900] : blue[100]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const FormikInput = (props) => {
  const { label, name, labelLayout: propLabelLayout, ...rest } = props;

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
                    <InputLabel
                      style={{ color: '#5A5A5A' }}
                      htmlFor={name}
                    >
                      {label}
                    </InputLabel>
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <StyledTextarea
                    {...field}
                    {...rest}
                    error={form.errors[name] && form.touched[name]}
                    helperText={<ErrorMessage name={name} />}
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Minimum 3 rows"
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
                <StyledTextarea
                  {...field}
                  {...rest}
                  error={form.errors[name] && form.touched[name]}
                  helperText={<ErrorMessage name={name} />}
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Minimum 3 rows"
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