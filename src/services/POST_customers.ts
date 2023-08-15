import supabase from '../config/supabaseClient.js';

export const onSubmitCustomer = async (values, actions) => {
  try {
    // Insert into the invoices table
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('buyers')
      .insert([
        {
          name: values.name,
          address: values.address,
          country: values.country,
          vatnumber: values.vatnumber,
          contractnumber: values.contractnumber,
          representative: values.representative,
          paymentterm: values.paymentterm,
          deliveryterm: values.deliveryterm,
          currency: values.currency,
          registrationnumber: values.registrationnumber,
        }
      ]);


    // Handle successful insertion
    alert('Customer data successfully inserted!');
    actions.resetForm();
  } catch (error) {
    console.error('Error inserting customer data:', error);
    alert('There was an error inserting the customer data.');
  }
};

