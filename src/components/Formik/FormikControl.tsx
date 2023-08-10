import React from 'react';
import FormikInput from './FormikInput';
import FormikAutoComplete from './FormikAutoComplete';
import FormikDatePicker from './FormikDatePicker';
import FormikDropdown from './FormikDropdown';
import FormikTextArea from './FormikTextArea';

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
