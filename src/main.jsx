// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

// DO NOT REMOVE: Seeds the local storage database with data
import AuthenticationProvider from './components/AuthProvider';
import Router from './Router';
import store from './state/store';

// import App from './App';
import './index.css';
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthenticationProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthenticationProvider>
   </ThemeProvider>,
);
