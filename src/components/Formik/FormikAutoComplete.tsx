import { InputLabel, Autocomplete, TextField } from '@mui/material';
import { Field, ErrorMessage } from 'formik';
import React from 'react';

// Define types for film data


interface FormikAutoCompleteProps<T> {
  label: string;
  name: string;
  options: T[];
  getOptionLabel: (option: T) => string;
}

const FormikAutoComplete = <T, >(props: FormikAutoCompleteProps<T>) => {
  const { label, name, options, getOptionLabel, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form }) => (
        <>
          <InputLabel
            style={{ color: '#5A5A5A', marginBottom: '5px' }}
            htmlFor={name}
          >
            {label}
          </InputLabel>
          <Autocomplete
            {...rest}
            options={options}
            getOptionLabel={getOptionLabel}
            id={name}
            // value={field.value}
            autoSelect
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
            // onChange={(event, value) => form.setFieldValue(name, value)}
          />
        </>
      )}
    </Field>
  );
};

export default FormikAutoComplete;
