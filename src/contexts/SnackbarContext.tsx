import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SnackbarContextProps {
  snackbarInfo: {
    open: boolean;
    severity?: string;
    message: string;
  };
  openSnackbar: (message: string, severity: string) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    severity: undefined,
    message: ''
  });

  const openSnackbar = (message: string, severity: string) => {
    setSnackbarInfo({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ snackbarInfo, openSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
