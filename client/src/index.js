import React from 'react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import store from './middleware/store.js';

// App Component
import App from './App';

const root = createRoot(document.getElementById('root'));

if(process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const getConfiguration = () => ({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri:window.location.origin,
  cacheLocation: process.env.REACT_APP_AUTH0_CACHE_LOCATION
})

root.render(
  <Provider store={store}>
    <Auth0Provider {...getConfiguration()}>
      <App/>
    </Auth0Provider>
  </Provider>
);

