import { useQuery } from '@tanstack/react-query';
import supabase from "../config/supabaseClient";

export async function fetchAddressDetails(client) {
  const { data, error } = await client.from('seller_addresses').select('*');
  if (error) {
    throw error;
  }
  return data;
}

const useAddressDetail = () => {
  const queryKey = ['seller_addresses'];

  const queryFn = async () => {
    return fetchAddressDetails(supabase);
  };

  const {
    data: seller_addresses,
    error,
    isLoading,
    refetch: refetch_address
  } = useQuery(queryKey, queryFn, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { seller_addresses, error, isLoading, refetch_address };
};

export default useAddressDetail;

