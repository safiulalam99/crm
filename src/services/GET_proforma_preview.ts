import supabase from '../config/supabaseClient.js';

export const getInvoiceData = async (invoicesNumber) => {
  try {
    // Fetch from the invoicess table
    const { data: invoicesData, error: invoicesError } = await supabase
      .from('proforma')
      .select(
        `
      *,
      buyers:buyers (
        *,
        currency:currencies(name, symbol)
      ),
      sellers:sellers (*),
      address:seller_addresses (id, country, address),
      bank_details:bank_details (*),
      products: proforma_products(
        *,
        name:products (*)
      ),
      signatures:signatures (
        id,
        name,
        email,
        image
      )
    `
      )
      .eq('proforma_id', invoicesNumber);
    if (invoicesError) throw invoicesError;

    // The data will be structured such that the main invoices details are in the root of the returned object.
    // Nested within are the details of the buyer, seller, and the products associated with this invoices.
    return invoicesData;
  } catch (error) {
    console.error('Error fetching invoices data:', error);
    alert('There was an error fetching the invoices data.');
    return null;
  }
};

export const checkProformaNumberExists = async (invoiceNumber: string, userId: string) => {
  const { data, error } = await supabase
    .from('proforma')
    .select('invoicenumber')
    .eq('invoicenumber', invoiceNumber)
    .eq('user_id', userId); // Add this line to check against the user's ID

  if (error) {
    console.error('Error checking invoice number:', error);
    return false;
  }

  return data.length > 0; // true if any rows are returned, false otherwise
};

export const checkInvoiceNumberExists = async (invoiceNumber: string, userId: string) => {
  const { data, error } = await supabase
    .from('invoices')
    .select('invoicenumber')
    .eq('invoicenumber', invoiceNumber)
    .eq('user_id', userId); // Add this line to check against the user's ID

  if (error) {
    console.error('Error checking invoice number:', error);
    return false;
  }

  return data.length > 0; // true if any rows are returned, false otherwise
};

export const checkOrderNumberExists = async (invoiceNumber: string, userId: string) => {
  const { data, error } = await supabase
    .from('order_confirmation')
    .select('invoicenumber')
    .eq('invoicenumber', invoiceNumber)
    .eq('user_id', userId); // Add this line to check against the user's ID

  if (error) {
    console.error('Error checking invoice number:', error);
    return false;
  }

  return data.length > 0; // true if any rows are returned, false otherwise
};
