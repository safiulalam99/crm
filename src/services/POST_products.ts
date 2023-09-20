import supabase from '../config/supabaseClient.js';


export const onSubmitProduct = async (values, actions, openSnackbar, user) => {


  try {
    const { data: product, error: customerError } = await supabase
      .from('products')
      .insert({
        name: values.name,
        description: values.description,
        category: values.category,
        price: values.price,
        defaultquantity: values.defaultquantity,
        maxquantity: values.maxquantity,
        imageurl: values.imageurl,
        user_id:user
      });

    if (customerError) throw customerError;

    openSnackbar('Product data successfully inserted!', 'success');

    actions.resetForm();
    // navigate(`/components/Product/preview/${values.ProductNumber}`);
  } catch (error) {
    openSnackbar('There was an error inserting the product data.', 'error');
  }
};
