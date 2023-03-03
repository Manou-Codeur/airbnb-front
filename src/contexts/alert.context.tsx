import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface alertContextType {
  openAlert: boolean;
  toggleOpenAlert: () => void;
  handleClose: (e: any) => void;
  message: string;
  setMessage: string | Dispatch<SetStateAction<string>>;
  type: string;
  setType: string | Dispatch<SetStateAction<string>>;
}

const alertContextInitialValues: alertContextType = {
  openAlert: false,
  toggleOpenAlert: () => {},
  handleClose: (e: any) => {},
  message: "",
  setMessage: () => {},
  type: "",
  setType: () => {},
};

export const AlertContext = createContext<alertContextType>(alertContextInitialValues);

export const useAlert = () => {
  return useContext(AlertContext);
};

export function AlertProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (openAlert) {
      setTimeout(() => {
        toggleOpenAlert();
      }, 2000);
    }
  });

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenAlert(false);
  };

  const toggleOpenAlert = () => {
    setOpenAlert((prev) => !prev);
  };

  const value = {
    openAlert: openAlert,
    toggleOpenAlert: toggleOpenAlert,
    handleClose: handleClose,
    message: message,
    setMessage: setMessage,
    type: type,
    setType: setType,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
