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
import EditProduct from './content/pages/ProductsPage/EditProduct';
import EditCustomer from './content/pages/CustomersPage/EditCustomer';
import CreateInvoice from './content/pages/CreateInvoice';
import InvoicePage from './content/pages/InvoicePage';
import ProformaInvoice from './content/pages/PDFProformaInvoice/PDFPreview';
import CustomerDashboard from './content/pages/CustomerDashboad/CustomerDashboard';
import NewDashboard from './content/pages/CustomerDashboad/NewDashboard';

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
const OrderConfiramtionPDF = Loader(lazy(() => import('src/content/pages/PDFOrderConfirmation/PDFPreview')));
const InvoicePDF = Loader(lazy(() => import('src/content/pages/PDFInvoice/PDFPreview')));
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
const CreateOrderConfirmation = Loader(
  lazy(() => import('src/content/pages/CreateOrderConfirmation'))
);
const CreateProforma = Loader(
  lazy(() => import('src/content/pages/CreateProforma'))
);
const OrderConfirmationPage = Loader(lazy(() => import('src/content/pages/OrderConfirmationPage')));
const ProformaPage = Loader(lazy(() => import('src/content/pages/ProformaPage')));

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
    element: (
      <AuthWrapper>
        <BaseLayout />
      </AuthWrapper>
    ),
    children: [
      // {
      //   path: '/',
      //   element: <Overview />
      // },
      {
        path: 'final/:id',
        element: <Invoice_final />
      },
      // {
      //   path: 'pdf',
      //   element: <AuthWrapper><PDF /></AuthWrapper>
      // },
      // {
      //   path: 'pdf/:id',
      //   element: <AuthWrapper><PDF /></AuthWrapper>
      // },
      // {
      //   path: 'final/',
      //   element: <AuthWrapper><Invoice_final /></AuthWrapper>
      // },
      {
        path: 'overview',
        element: (
          <AuthWrapper>
            <Navigate to="/" replace />{' '}
          </AuthWrapper>
        )
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
        path: 'company_details',
        element: <CreateSeller refreshSellers={null} handleCloseSellerDrawer={null} />
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
        path: 'order_confirmation',
        element: <OrderConfirmationPage />
      },
      {
        path: 'order_confirmation/new',
        element: <CreateOrderConfirmation />
      },
      {
        path: 'proforma',
        element: <ProformaPage />
      },
      {
        path: 'proforma/new',
        element: <CreateProforma />
      },
      {
        path: 'invoice',
        element: <InvoicePage />
      },
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
        path: 'customers/edit/:id',
        element: <EditCustomer />
      },
      {
        path: `customers/view/:id`,
        element: <CustomerDashboard />
      },
      {
        path: 'customers/views/:id',
        element: <NewDashboard />
      },
      // {
      //   path: 'pdf',
      //   element: <PDF />
      // },
      {
        path: 'order_confirmation/pdf/:id',
        element: <OrderConfiramtionPDF />
      },
      {
        path: 'proforma/pdf/:id',
        element: <ProformaInvoice />
      },
      {
        path: 'invoice/pdf/:id',
        element: <InvoicePDF />
      },

      {
        path: 'products',
        element: <ProductsTable />
      },
      {
        path: 'products/new',
        element: <CreateProduct closeDrawer={null} afterCreate={null} />
      },

      {
        path: 'products/edit/:id',
        element: <EditProduct />
      }
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
