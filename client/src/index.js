import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import store from './middleware/store.js';

// App Component
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Auth0Provider 
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri= {window.location.origin}
      cacheLocation={process.env.REACT_APP_AUTH0_CACHE_LOCATION}
      >
      <App/>
    </Auth0Provider>
  </Provider>
);

