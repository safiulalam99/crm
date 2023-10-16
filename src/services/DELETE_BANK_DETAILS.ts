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

// useDeleteBankDetail.js
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBankDetail = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBankDetail, {
    // When mutate is called:
    onMutate: async (bankDetailId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['bank_details']);

        // Snapshot the previous value
        const previousBankDetails = queryClient.getQueryData(['bank_details']);

        // Optimistically update to the new value
        queryClient.setQueryData(['bank_details'], (old: any) =>
            (old as Array<any>).filter((detail) => detail.id !== bankDetailId)
        );

        // Return a context object with the snapshotted value
        return { previousBankDetails };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, bankDetailId, context) => {
      queryClient.setQueryData(['bank_details'], context.previousBankDetails);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['bank_details']);
    },
  });

  return mutation;
};
