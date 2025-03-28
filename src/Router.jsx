import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ListingFavoritesPage from '@/pages/Favorites';
import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';

import App from './App';
import Route from './components/Route';
import SignInPage from './pages/SignInPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: '/signin',
        element: (
          <Route>
            <SignInPage />
          </Route>
        ),
      },
      {
        path: '/',
        element: (
          <Route isProtected={true}>
            <HomePage />
          </Route>
        ),
      },
      {
        path: '/listings/:listingId',
        element: (
          <Route isProtected={true}>
            <ListingDetailsPage />
          </Route>
        ),
      },
      {
        path: '/favorites',
        element: (
          <Route isProtected={true}>
            <ListingFavoritesPage />
          </Route>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
