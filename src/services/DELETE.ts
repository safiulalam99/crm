import supabase from '../config/supabaseClient.js';

export const onDeleteCustomer = async (id, openSnackbar) => {
  try {
    // Insert into the invoices table
    const { data: customer, error: customererror } = await supabase
      .from('buyers')
      .delete()
      .eq('id', id);

    if (customererror) throw customererror;

    openSnackbar(`${id} deleted!`, 'success');
    return Promise.resolve(customer);  // Resolve the promise with the deleted product data

    // navigate(`/components/invoice/preview/${values.invoiceNumber}`);
  } catch (error) {
    openSnackbar(error.details, 'error');
    return Promise.reject(error);  // Reject the promise with the error

  }
};

export const onDeleteProduct = async (id, openSnackbar) => {
  try {
    // Insert into the invoices table
    const { data: products, error: productserror } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (productserror) throw productserror;
    openSnackbar(`${id} deleted!`, 'success');
    console.log(products)

    // navigate(`/components/invoice/preview/${values.invoiceNumber}`);
  } catch (error) {
    openSnackbar(error.details, 'error');
  }
};

export const onDeleteInvoice = async (id, openSnackbar) => {
  try {
    // Call the function to delete the order confirmation and related products
    const { data, error } = await supabase
      .rpc('delete_order_confirmation_and_products', { invoicenumber_param: id });

    if (error) throw error;
    
    openSnackbar(`${id} deleted!`, 'success');
    console.log(data)
    return Promise.resolve(data);  // Resolve the promise with the result

  } catch (error) {
    openSnackbar(error.details, 'error');
    console.log(error)
    return Promise.reject(error);  // Reject the promise with the error

  }
};


