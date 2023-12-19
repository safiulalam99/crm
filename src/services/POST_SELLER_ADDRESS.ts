import supabase from '../config/supabaseClient.js';

export const postAddressDetails = async (values, user, seller_id, openSnackbar) => {
  try {
    const { data: newAddressDetails, error: addressDetailsError } = await supabase
      .from("seller_addresses") // Replace with your actual table name
      .insert({
        address: values.address,
        country: values.country,
        user_id: user,
        seller_id: seller_id,
      });

    if (addressDetailsError) throw addressDetailsError;

    openSnackbar("Address details successfully posted!", "success");
    return { success: true, newAddressDetails };
  } catch (error) {
    openSnackbar(`Error posting address details: ${error.message}`, "error");
    console.log(error)

    return { success: false, error: error.message };
  }
};

