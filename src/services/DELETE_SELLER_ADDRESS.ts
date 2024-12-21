import supabase from "../config/supabaseClient";

export const deleteAddressDetail = async (addressDetailId) => {
  const { data, error } = await supabase
    .from('seller_addresses')
    .delete()
    .eq('id', addressDetailId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAddressDetail = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteAddressDetail, {
    onMutate: async (addressDetailId) => {
        await queryClient.cancelQueries(['seller_addresses']);

        const previousAddressDetails = queryClient.getQueryData(['seller_addresses']) as Array<any>;

        queryClient.setQueryData(['seller_addresses'], (old: Array<any>) =>
            old.filter((detail) => detail.id !== addressDetailId)
        );

        return { previousAddressDetails };
    },
    onError: (err, addressDetailId, context) => {
      queryClient.setQueryData(['seller_addresses'], context.previousAddressDetails);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['seller_addresses']);
    },
  });

  return mutation;
};
