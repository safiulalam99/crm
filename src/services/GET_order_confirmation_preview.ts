import supabase from '../config/supabaseClient.js';

export const getOrder_confirmation = async (order_confirmationNumber) => {
  try {
    // Fetch from the order_confirmations table
    const { data: order_confirmationData, error: order_confirmationError } =
      await supabase
        .from('order_confirmation')
        .select(
          `
      *,
      buyers:buyers (
        *,
        currency:currencies(name, symbol)
      ),
      sellers:sellers (*),
      address:seller_addresses (id, country, address),
      products: order_confirmation_products(
        *,
        name:products (*)
      )
    `
        )
        .eq('invoicenumber', order_confirmationNumber);

    if (order_confirmationError) throw order_confirmationError;

    // The data will be structured such that the main order_confirmation details are in the root of the returned object.
    // Nested within are the details of the buyer, seller, and the products associated with this order_confirmation.
    return order_confirmationData;
  } catch (error) {
    console.error('Error fetching order_confirmation data:', error);
    alert('There was an error fetching the order_confirmation data.');
    return null;
  }
};
