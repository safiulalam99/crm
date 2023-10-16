import supabase from '../config/supabaseClient.js';

// src/services/UPDATE.js
export const onUpdateSeller = async (
  values,
  actions,
  openSnackbar,
  user,
  refreshSellers
) => {
  let updatedBankDetails, bankDetailsError;  // Declare these variables at the top of your function

  try {
    // Update the sellers table
    const { data: updatedSeller, error: sellerError } = await supabase
      .from("sellers")
      .update({
        name: values.name,
        address: values.address,
        vatnumber: values.vatnumber,
        displayname: values.displayname,
        managingdirector: values.managingdirector,
        country: values.country,
      })
      .eq("id", values.id)
      .select();

    if (sellerError) throw sellerError;

    // Retrieve the seller_id from the updatedSeller data
    const seller_id = updatedSeller[0]?.id;

    if (!seller_id) {
      throw new Error("Seller ID not found");
    }

    // Check for existing bank details
    const { data: existingBankDetails, error: fetchBankDetailsError } =
      await supabase.from("bank_details").select().eq("user_id", user);

    if (fetchBankDetailsError) throw fetchBankDetailsError;

    if (existingBankDetails.length === 0) {
      // No existing record, create a new one
      ({ data: updatedBankDetails, error: bankDetailsError } = await supabase
        .from("bank_details")
        .insert({
          iban: values.iban,
          bank: values.bankname,
          bic: values.bankbic,
          accountname: values.bankaccountname,
          user_id: user,
          seller_id: seller_id,
        }));
    } else {
      // Existing record, update it
      ({ data: updatedBankDetails, error: bankDetailsError } = await supabase
        .from("bank_details")
        .update({
          iban: values.iban,
          bank: values.bankname,
          bic: values.bankbic,
          accountname: values.bankaccountname,
          user_id: user,
          seller_id: seller_id,
        })
        .eq("user_id", user));
    }

    if (bankDetailsError) throw bankDetailsError;

    openSnackbar("Seller and Bank details successfully updated!", "success");
    refreshSellers != null ? await refreshSellers() : "";
    return { success: true };
  } catch (error) {
    openSnackbar(
      `There was an error updating the details: ${error.message}`,
      "error"
    );
    return { success: false, error: error.message };
  }
};


export const onUpdateBuyer = async (values, actions, openSnackbar, user) => {
  try {
    const { data: updatedSeller, error: sellerError } = await supabase
      .from('buyers')
      .update({
        name: values.name,
        address: values.address,
        vatnumber: values.vatnumber,
        contactperson: values.contactperson,
        paymentterm: values.paymentterm,
        country: values.country,
        currency_id: values.currency_id,
        registrationnumber: values.registrationnumber,
        contractnumber: values.contractnumber
      })
      .eq('id', values.id)
      .select();

    if (sellerError) throw sellerError;

    openSnackbar('Seller details successfully updated!', 'success');

    actions.resetForm();
    window.location.reload();

    // You can navigate or perform additional actions here
  } catch (error) {
    openSnackbar('There was an error updating the seller details.', 'error');
  }
};
