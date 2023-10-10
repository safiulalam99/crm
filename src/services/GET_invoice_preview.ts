import supabase from '../config/supabaseClient.js';

export const getInvoiceData = async (invoiceNumber) => {
  try {
    // Fetch from the invoices table
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .select(
        `
          *,
          buyers (id, name, address, country, vatnumber, contractnumber, representative, paymentterm, deliveryterm, registrationnumber, currency_id),
          sellers (id, name, address, vatnumber, displayname, managingdirector, country),
          invoice_products (product_id (id, name, description, category, price, time_stamp), unitprice, units, productlot, unittotal, unitvat)
        `
      )
      .eq('invoicenumber', invoiceNumber);

    if (invoiceError) throw invoiceError;

    // The data will be structured such that the main invoice details are in the root of the returned object.
    // Nested within are the details of the buyer, seller, and the products associated with this invoice.
    return invoiceData;
  } catch (error) {
    console.error('Error fetching invoice data:', error);
    alert('There was an error fetching the invoice data.');
    return null;
  }
};

