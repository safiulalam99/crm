import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient';
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




export async function getBankDetails(client) {
  const { data, error } = await client.from('bank_details').select('*');
  if (error) {
    throw error;
  }
  return data;
}

const useBankDetail = () => {
  const queryKey = ['bank_details'];

  const queryFn = async () => {
    return getBankDetails(supabase);
  };

  const {
    data: bank_details,
    error,
    isLoading,
    refetch
  } = useQuery(queryKey, queryFn, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { bank_details, error, isLoading, refetch };
};

export default useBankDetail;

