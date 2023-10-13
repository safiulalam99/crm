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
    console.log(productserror);
    openSnackbar(`${id} deleted!`, 'success');

    // navigate(`/components/invoice/preview/${values.invoiceNumber}`);
  } catch (error) {
    openSnackbar(error.details, 'error');
    console.log(error);
  }
};

export const onDeleteInvoice = async (id, openSnackbar) => {
  try {
    // Start a transaction
    const { data: products, error: productsError } = await supabase
      .rpc('delete_invoice_and_products', { invoice_id: id });
    
    if (productsError) throw productsError;
    openSnackbar(`${id} deleted!`, 'success');
    return Promise.resolve(products);  // Resolve the promise with the deleted invoice and product data

  } catch (error) {
    openSnackbar(error.details, 'error');
    return Promise.reject(error);  // Reject the promise with the error
  }
};

