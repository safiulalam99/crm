import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import router_main from 'src/router_main';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { SnackbarProvider } from './contexts/SnackbarContext';
import GlobalSnackbar from './components/Snackbar';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/atoms';
import { AuthWrapper, getLoggedInUserDetails } from './contexts/AuthContext';
import { useEffect } from 'react';
// Create a client
function App() {
  const content = useRoutes(router);
  const content_main = useRoutes(router_main);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await getLoggedInUserDetails();
      if (userDetails) {
        // Store user ID in localStorage
        localStorage.setItem('userId', userDetails.id);
        setUser(userDetails);
      }
    };
    

    fetchUser();
  }, []);
  return (
    <ThemeProvider>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <SnackbarProvider>
            {content} <GlobalSnackbar />
          </SnackbarProvider>
        </LocalizationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
export default App;
