import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient';

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
