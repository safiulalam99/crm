import { numberToWords } from 'src/utils/towords.js';
import supabase from '../config/supabaseClient.js';

export const onSubmitInvoice = async (
  values,
  actions,
  navigate,
  openSnackbar,
  user
) => {
  try {
    // Insert into the invoices table
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('order_confirmation')
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
          numberinwords: numberToWords(values.total),
          paymentsplit: values.paymentSplit,
          paymentstatus: values.paymentStatus,
          subtotal: values.subTotal,
          taxrate: values.taxRate,
          total: values.total,
          totaldiscount: values.totalDiscount,
          totaltax: values.totalTax,
          user_id: user,
          address_id: values.sellerAddress,
        }
      ]);

    if (invoiceError) throw invoiceError;

    // Insert into the invoice_products table
    for (let product of values.products) {
      const { error: productError } = await supabase
        .from('order_confirmation_products')
        .insert([
          {
            invoicenumber: values.invoiceNumber,
            product_id: product.name.id,
            unitprice: product.unitPrice,
            units: product.units,
            productlot: product.productlot,
            languageversion: product.languageversion,
            unittotal: product.unitTotal,
            unitvat: product.unitVat,
            user_id: user,
          }
        ]);
      if (productError) throw productError;
    }

    openSnackbar('Order confirmation data successfully inserted!', 'success');

    actions.resetForm();
    window.open(`/components/order_confirmation/pdf/${values.invoiceNumber}`, '_blank');
  } catch (error) {
    // console.log('this is the one',error)
    openSnackbar('There was an error inserting the Order Confirmation.', 'error');
  }
};
