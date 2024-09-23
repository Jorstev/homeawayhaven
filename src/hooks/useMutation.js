import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMutationCustom({
  mutationFn,
  mutationKey,
  successMsg,
  errorMsg,
}) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    isSuccess,
    mutate: mutateDelete,
  } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(mutationKey);
      toast.success(successMsg);
    },
    onError: () => {
      toast.error(errorMsg);
    },
  });
}
