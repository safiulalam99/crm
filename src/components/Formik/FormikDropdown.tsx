import React from 'react';
import { Field, ErrorMessage } from 'formik';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

const FormikSelect = (props) => {
  const { label, name, options, ...rest } = props;
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

            <FormControl error={form.errors[name] && form.touched[name]} fullWidth>
              <Select id={name} {...field} {...rest} fullWidth>
                <MenuItem value="">None</MenuItem>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                <ErrorMessage name={name} />
              </FormHelperText>
            </FormControl>
          </>
        );
      }}
    </Field>
  );
};

export default FormikSelect;
