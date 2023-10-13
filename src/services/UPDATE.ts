import supabase from '../config/supabaseClient.js';

export const onUpdateSeller = async (values, actions, openSnackbar, user) => {
  try {
    const { data: updatedSeller, error: sellerError } = await supabase
      .from('sellers')
      .update({
        name: values.name,
        address: values.address,
        vatnumber: values.vatnumber,
        displayname: values.displayname,
        managingdirector: values.managingdirector,
        country: values.country
      })
      .eq('id', values.id).select();

    if (sellerError) throw sellerError;

    openSnackbar('Seller details successfully updated!', 'success');

    actions.resetForm();
    window.location.reload();

    // You can navigate or perform additional actions here
  } catch (error) {
    openSnackbar('There was an error updating the seller details.', 'error');
  }
};

export const onUpdateBuyer = async (values, actions, openSnackbar, user) => {
  try {
    const { data: updatedSeller, error: sellerError } = await supabase
      .from('buyers')
      .update({
        name: values.name,
        address: values.address,
        vatnumber: values.vatnumber,
        contactperson: values.contactperson,
        paymentterm: values.paymentterm,
        country: values.country,
        currency_id: values.currency_id,
        registrationnumber: values.registrationnumber,
        contractnumber: values.contractnumber,
      })
      .eq('id', values.id).select();

    if (sellerError) throw sellerError;

    openSnackbar('Seller details successfully updated!', 'success');

    actions.resetForm();
    window.location.reload();

    // You can navigate or perform additional actions here
  } catch (error) {
    openSnackbar('There was an error updating the seller details.', 'error');
  }
};
