import supabase from '../config/supabaseClient.js';

export const getInvoiceData = async (invoicesNumber) => {
  try {
    // Fetch from the invoicess table
    const { data: invoicesData, error: invoicesError } = await supabase
      .from('invoices')
      .select(
        `
      *,
      buyers:buyers (
        *,
        currency:currencies(name, symbol)
      ),
      sellers:sellers (*),
      bank_details:bank_details (*),
      products: invoices_products(
        *,
        name:products (*)
      )
    `
      )
      .eq('invoicenumber', invoicesNumber);
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
