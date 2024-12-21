import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import  AuthProvider  from './contexts/AuthContext';
import { Provider } from 'jotai/react';
import { AuthWrapper } from './contexts/AuthContext';
import { CookiesProvider } from 'react-cookie';

// Create a client
const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthWrapper>
        <Provider>
          <HelmetProvider>
            <SidebarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SidebarProvider>
          </HelmetProvider>
        </Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AuthWrapper>
    </CookiesProvider>
  </QueryClientProvider>,

  document.getElementById('root')
);

serviceWorker.unregister();
