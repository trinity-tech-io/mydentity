import { useSnackbar } from "notistack";

export function useToast(): {
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
} {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessToast = (message: string): void => {
    enqueueSnackbar(message, { variant: "success" });
  }

  const showErrorToast = (message: string): void => {
    enqueueSnackbar(message, { variant: "error" });
  }

  return {
    showSuccessToast,
    showErrorToast
  }
}