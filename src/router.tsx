import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import CreateProduct from './content/pages/ProductsPage/CreateProduct';
import ProductsTable from './content/pages/ProductsPage/ProductsTable';
import CustomersTable from './content/pages/CustomersPage/CustomersTable';
import { AuthWrapper } from './contexts/AuthContext';
import CreateSeller from './content/pages/CreateSeller';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

const Docx = Loader(lazy(() => import('src/content/applications/docs')));
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);

// Components
const CreateInvoice = Loader(
  lazy(() => import('src/content/pages/CreateInvoice'))
);
const InvoicePage = Loader(lazy(() => import('src/content/pages/InvoicePage')));

const CreateCustomer = Loader(
  lazy(() => import('src/content/pages/CustomersPage/CreateCustomer'))
);

const Invoice_final = Loader(
  lazy(() => import('src/content/pages/Invoice_final/Invoice'))
);
const MainInvoice = Loader(
  lazy(() => import('src/components/InvoiceTemplate/MainInvoice'))
);

const InvoicePreview = Loader(
  lazy(() => import('src/content/pages/InvoicePreview'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <AuthWrapper>
        <SidebarLayout />
      </AuthWrapper>
    ),
    children: [
      // {
      //   path: '/',
      //   element: <Overview />
      // },
      {
        path: '/',
        element: <Tasks />
      },
      // {
      //   path: '/login',
      //   element: <Login />
      // },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      }
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      // {
      //   path: '/',
      //   element: <Overview />
      // },
      {
        path: 'final/:id',
        element: <AuthWrapper><Invoice_final /></AuthWrapper>
      },
      // {
      //   path: 'final/',
      //   element: <AuthWrapper><Invoice_final /></AuthWrapper>
      // },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '500',
            element: <Status500 />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },

  {
    path: 'management',
    element: (
      <AuthWrapper>
        <SidebarLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: (
      <AuthWrapper>
        <SidebarLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/" replace />
      },
      {
        path: 'invoice',
        element: <InvoicePage />
      },
      // {
      //   path: 'doc',
      //   element: <Docx />
      // },

      {
        path: 'invoice/new',
        element: <CreateInvoice />
      },
      {
        path: 'customers',
        element: <CustomersTable />
      },
      {
        path: 'customers/new',
        element: <CreateCustomer />
      },
      {
        path: 'my/new',
        element: <CreateSeller />
      },
      {
        path: 'products',
        element: <ProductsTable />
      },
      {
        path: 'products/new',
        element: <CreateProduct />
      },
      // {
      //   path: 'invoice/preview/:id',
      //   element: <InvoicePreview />
      // }
      // {
      //   path: 'package',
      //   element: <MainInvoice />
      // },
    ]
  }
];

export default routes;
