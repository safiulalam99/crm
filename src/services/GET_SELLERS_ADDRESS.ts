import { useQuery } from '@tanstack/react-query';
import supabase from "../config/supabaseClient";

const fetchAddressDetails = async () => {
  const { data, error } = await supabase.from("seller_addresses").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const useAddressDetail = () => {
  const { data: seller_addresses, error, isLoading, refetch: refetch_address } = useQuery(["seller_addresses"], fetchAddressDetails);

  return { seller_addresses, error, isLoading, refetch_address };
};

export default useAddressDetail;
