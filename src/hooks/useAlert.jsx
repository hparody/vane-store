import { useSnackbar } from "notistack";
import { useCallback } from "react";

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const triggerAlert = useCallback(
    ({ message, type }) => enqueueSnackbar(message, { variant: type }),
    [enqueueSnackbar]
  );
  return { triggerAlert };
};

export default useAlert;
