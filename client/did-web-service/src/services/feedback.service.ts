import { useSnackbar } from "notistack";

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessToast = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  }

  const showErrorToast = (message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  }

  return {
    showSuccessToast,
    showErrorToast
  }
}