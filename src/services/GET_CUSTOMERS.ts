import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient'; // Adjust the path to your Supabase configuration

const fetchCustomers = async () => {
  let { data, error } = await supabase.from('buyers').select(`*`);
  if (error) throw error;
  return data;
};

const useGetCustomers = () => {
  const {
    data: customerData,
    error,
    isLoading
  } = useQuery(['buyers'], fetchCustomers, {
    staleTime: 10000 // data considered "fresh" for 10 seconds
  });

  console.log(customerData);
  return { customerData, error, isLoading };
};

export default useGetCustomers;
