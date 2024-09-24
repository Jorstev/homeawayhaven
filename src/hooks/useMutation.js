import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 *
 * @param {*Async function to perform mutation} mutationFn
 * @param {*Mutation key where mutation will happen} mutationKey
 * @param {*Success message} successMsg
 * @param {*Error message} errorMsg
 * @returns isLoading, isError, isSuccess, mutate
 */
export function useMutationCustom(
  mutationFn,
  mutationKey,
  successMsg,
  errorMsg
) {
  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, mutate } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(mutationKey);
      toast.success(successMsg);
    },
    onError: () => {
      toast.error(errorMsg);
    },
  });
  return { isLoading, isError, isSuccess, mutate };
}
