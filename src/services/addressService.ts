// src/services/addressService.js

import supabase from 'src/config/supabaseClient';

export const postAddressDetails = async (data) => {
  const { error, data: responseData } = await supabase
    .from('seller_addresses')
    .insert([data]);

  if (error) throw new Error(error.message);
  return responseData;
};

export const setPrimaryAddress = async ({ sellerId, addressId }) => {
  const { error } = await supabase
    .from('sellers')
    .update({ primary_address: addressId })
    .eq('id', sellerId);

  if (error) throw new Error(error.message);
};

export const getPrimaryAddress = async (sellerId) => {
  const { data, error } = await supabase
    .from('sellers')
    .select('primary_address')
    .eq('id', sellerId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteAddressDetail = async (addressId) => {
  const { error } = await supabase
    .from('seller_addresses')
    .delete()
    .eq('id', addressId);

  if (error) throw new Error(error.message);
};
