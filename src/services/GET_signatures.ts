import { useQuery } from '@tanstack/react-query';
import supabase from '../config/supabaseClient';

const fetchSignatures = async (userId: string) => {
  const { data, error } = await supabase
    .from('signatures')
    .select(`
      id,
      user_id,
      seller_id,
      name,
      email,
      image,
      color,
      created_at,
      is_default
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const useSignatures = (userId: string) => {
  return useQuery(
    ['signatures', userId],
    () => fetchSignatures(userId),
    {
      staleTime: 10000,
      enabled: !!userId // Only run query if userId exists
    }
  );
}; 