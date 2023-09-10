import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import CreateProduct from './content/pages/ProductsPage/CreateProduct';
import ProductsTable from './content/pages/ProductsPage/ProductsTable';

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

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
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
const CreateInvoice = Loader(lazy(() => import('src/content/pages/CreateInvoice')));
const InvoicePage = Loader(lazy(() => import('src/content/pages/InvoicePage')));
const InvoiceHTML = Loader(
  lazy(() => import('src/content/applications/InvoiceHTML'))
);
const CreateCustomer = Loader(
  lazy(() => import('src/content/pages/CustomersPage/CreateCustomer'))
);

const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
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
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'final',
        element: <Invoice_final />
      },
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
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="tasks" replace />
      },
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
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
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/" replace />
      },
      {
        path: 'invoice',
        element: <InvoicePage />
      },
      {
        path: 'html',
        element: <InvoiceHTML />
      },
      {
        path: 'doc',
        element: <Docx />
      },

      {
        path: 'invoice/new',
        element: <CreateInvoice />
      },
      {
        path: 'customers',
        element: <CreateCustomer />
      },
      {
        path: 'products',
        element: <ProductsTable />
      },
      {
        path: 'products/new',
        element: <CreateProduct />
      },
      {
        path: 'invoice/preview/:id',
        element: <InvoicePreview />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'package',
        element: <MainInvoice />
      },
      {
        path: 'tabs',
        element: <Tabs />
      }
    ]
  }
];

export default routes;
