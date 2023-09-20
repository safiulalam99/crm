import supabase from '../config/supabaseClient.js';

export const onSubmitCustomer = async (
  values,
  actions,
  navigate,
  openSnackbar,
  user
) => {
  try {
    // Insert into the invoices table
    const { data: customer, error: customererror } = await supabase
      .from('buyers')
      .insert([
        {
          name: values.name,
          address: values.address,
          country: values.country,
          vatnumber: values.vatnumber,
          contractnumber: values.contractnumber,
          contactperson: values.contactperson,
          contactpersonrole: values.contactpersonrole,
          paymentterm: values.paymentterm,
          deliveryterm: values.deliveryterm,
          currency_id: values.currency,
          registrationnumber: values.registrationnumber,
          user_id: user
        }
      ])
      .select();

    if (customererror) throw customererror;

    openSnackbar('Invoice data successfully inserted!', 'success');

    actions.resetForm();
    // navigate(`/components/invoice/preview/${values.invoiceNumber}`);
  } catch (error) {
    openSnackbar('There was an error inserting the invoice data.', 'error');
  }
};
