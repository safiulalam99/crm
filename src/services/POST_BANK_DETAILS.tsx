import { useState } from 'react';
import supabase from '../config/supabaseClient.js';

  export const postBankDetails = async (values, user, seller_id, openSnackbar) => {
    try {
      const { data: newBankDetails, error: bankDetailsError } = await supabase
        .from("bank_details")
        .insert({
          iban: values.iban,
          bank: values.bankname,
          bic: values.bankbic,
          accountname: values.bankaccountname,
          user_id: user,
          seller_id: seller_id,
        });

      if (bankDetailsError) throw bankDetailsError;

      openSnackbar("Bank details successfully posted!", "success");
    //   refresh != null ? await refresh() : "";
      return { success: true, newBankDetails };
    } catch (error) {
      openSnackbar(`Error posting bank details: ${error.message}`, "error");
      return { success: false, error: error.message };
    }
  };

