import supabase from '../config/supabaseClient.js';

export const onSubmitInvoice = async (values, actions) => {
  try {
    // Insert into the invoices table
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .insert([
        {
          buyer_id: values.buyerData.id,
          seller_id: values.sellerData.id,
          // currency_id: values.currency.id,
          comments: values.comments,
          date: values.date,
          deliverydate: values.deliveryDate,
          // deliveryterm: values.deliveryTerm,
          discountrate: values.discountRate,
          invoicenumber: values.invoiceNumber,
          // numberinwords: values.numberInWords,
          paymentsplit: values.paymentSplit,
          paymentstatus: values.paymentStatus,
          subtotal: values.subTotal,
          taxrate: values.taxRate,
          total: values.total,
          totaldiscount: values.totalDiscount,
          totaltax: values.totalTax,
          vattype: values.vatType
        }
      ]);

    if (invoiceError) throw invoiceError;

    // Insert into the invoice_products table
    for (let product of values.products) {
      const { error: productError } = await supabase
        .from('invoice_products')
        .insert([
          {
            invoicenumber: values.invoiceNumber,
            product_id: product.name.id,
            unitprice: product.unitPrice,
            units: product.units,
            unittotal: product.unitTotal,
            unitvat: product.unitVat
          }
        ]);
      if (productError) throw productError;
    }

    // Handle successful insertion
    alert('Invoice data successfully inserted!');
    actions.resetForm();
  } catch (error) {
    console.error('Error inserting invoice data:', error);
    alert('There was an error inserting the invoice data.');
  }
};

