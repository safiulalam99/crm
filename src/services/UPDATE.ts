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
