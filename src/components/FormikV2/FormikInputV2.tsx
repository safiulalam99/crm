import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, InputLabel } from '@mui/material';

const FormikInput = (props) => {
  const { label, defaultValue, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        return (
          <>
            <InputLabel
              style={{ color: '	#5A5A5A', marginBottom: '5px' }}
              htmlFor={name}
            >
              {label}
            </InputLabel>

            <TextField
            fullWidth
              id={name}
              {...field}
              {...rest}
              value={defaultValue}
              error={form.errors[name] && form.touched[name]}
              helperText={<ErrorMessage name={name} />}
              // InputProps={{
              //   style: { height: '40px', borderRadius: '5px' },
              // }}
            />
          </>
        );
      }}
    </Field>
  );
};

export default FormikInput;
