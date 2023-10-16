import { useQuery } from '@tanstack/react-query'
import supabase from "../config/supabaseClient";


const fetchBankDetails = async () => {
  const { data, error } = await supabase.from("bank_details").select("*");
  if (error) {
    throw error;
  }
  return data ;
};

const useBankDetail = () => {
  const { data: bank_details, error, isLoading, refetch } = useQuery(["bank_details"], fetchBankDetails);

  return { bank_details, error, isLoading, refetch };
};

export default useBankDetail;
