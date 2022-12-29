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
      domain='whatisaw.us.auth0.com'
      clientId= 'eACG1Ww9RQSOzODzyWu37HR0GalgYGsN'
      redirectUri= {window.location.origin}
      cacheLocation={'localstorage'}
      >
      <App/>
    </Auth0Provider>
  </Provider>
);

