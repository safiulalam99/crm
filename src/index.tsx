import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import  AuthProvider  from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </HelmetProvider>
  </QueryClientProvider>,

  document.getElementById('root')
);

serviceWorker.unregister();
