import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputLabel, TextField } from '@mui/material';
import { Field, ErrorMessage } from 'formik';

const FormikDatePicker = (props) => {
  const { label, name, ...rest } = props;
  
  return (
    <Field name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <>
            <InputLabel
              style={{ color: '	#5A5A5A', marginBottom: '5px' }}
              htmlFor={name}
            >
              {label}
            </InputLabel>

            <DatePicker
              value={value}
              onChange={(event, value) => setFieldValue(name, dayjs(value).format('YYYY-MM-DD'))}
              {...rest}
              onError={form.errors[name] && form.touched[name]}
              
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
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
