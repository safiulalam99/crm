// deleteBankDetail.js
import supabase from "../config/supabaseClient";

export const deleteBankDetail = async (bankDetailId) => {
  const { data, error } = await supabase
    .from('bank_details')
    .delete()
    .eq('id', bankDetailId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBankDetail = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBankDetail, {
    onMutate: async (bankDetailId) => {
        await queryClient.cancelQueries(['bank_details']);

        const previousBankDetails = queryClient.getQueryData(['bank_details']);

        queryClient.setQueryData(['bank_details'], (old: any) =>
            (old as Array<any>).filter((detail) => detail.id !== bankDetailId)
        );

        return { previousBankDetails };
    },
    onError: (err, bankDetailId, context) => {
      queryClient.setQueryData(['bank_details'], context.previousBankDetails);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['bank_details']);
    },
  });

  return mutation;
};
