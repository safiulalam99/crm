import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import router_main from 'src/router_main';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { SnackbarProvider } from './contexts/SnackbarContext';
import GlobalSnackbar from './components/Snackbar';

// Create a client
function App() {
  const content = useRoutes(router);
  const content_main = useRoutes(router_main);

  return (
    <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />

          <SnackbarProvider>
            {content} <GlobalSnackbar />
          </SnackbarProvider>
        </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
