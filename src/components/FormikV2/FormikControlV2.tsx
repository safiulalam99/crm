import React from 'react';
import FormikInput from './FormikInputV2';
import FormikAutoComplete from './FormikAutoCompleteV2';
import FormikDatePicker from './FormikDatePickerV2';
import FormikDropdown from './FormikDropdownV2';
import FormikTextArea from './FormikTextAreaV2';

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <FormikInput {...rest} />;
    
    case 'autocomplete':
      return <FormikAutoComplete {...rest} />;
    
    case 'select':
      return <input />;
    
    case 'radio':
      return <input />;
    
    case 'TextArea':
      return <FormikTextArea {...rest}/>;
    
    case 'dropdown':
      return <FormikDropdown {...rest} />;
    
    case 'date':
      return <FormikDatePicker {...rest}/>;
    
    }
  return <></>;
};

export default FormikControl;
