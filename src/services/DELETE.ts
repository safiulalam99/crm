import supabase from '../config/supabaseClient.js';

export const onDeleteCustomer = async (
  id,
  openSnackbar,
  user
) => {
  try {
    // Insert into the invoices table
    const { data: customer, error: customererror } = await supabase
      .from('buyers')
      .delete()
      .eq('id', id);

    if (customererror) throw customererror;

    openSnackbar(`${id} deleted!`, 'success');

    // navigate(`/components/invoice/preview/${values.invoiceNumber}`);
  } catch (error) {
    openSnackbar(`There was an error deleting the user ${id}.`, 'error');
  }
};
