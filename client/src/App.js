import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty } from 'lodash';
import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Components 
import Theme from './commonComponents/Theme';
import BaseRoute from './components/BaseRoute';
import ErrorFallback from './components/ErrorFallback';
import InprogressFallback from './components/InprogressFallback';
// Pages
import Login from './pages/Login';

// Middleware
import { getAppsRequest } from './middleware/actions/appsActions';
import { isUserLoggedInRequest } from './middleware/actions/authActions';

// Styles
import './App.scss';

export default () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth)
  const appList = useSelector((state) => state.apps.list)

  useEffect(() => {
    if(window.location.pathname != '/login' && window.navigator.onLine) {
      dispatch(isUserLoggedInRequest({ loginWithRedirect }))
    }
    return () => {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [])
  
  useEffect(() => {
    if(loggedUser.data && !loggedUser.loading && !loggedUser.error) {
      isEmpty(appList.data && !appList.loading) && dispatch(getAppsRequest())
    }
  }, [loggedUser])

  return (
    <div>
      <ErrorBoundary 
        fallbackRender={({error, resetErrorBoundary}) => (
          <ErrorFallback error={error}resetErrorBoundary={resetErrorBoundary} />
        )}  
      >
        <BrowserRouter>
          <Theme variant='default'/>
            <Suspense fallback={
                <InprogressFallback status={'Autenticando Usuario'}/>
              }>
                {window.location.pathname == '/login' ? <Login />:
                !loggedUser.data || !appList.data ? <InprogressFallback status={'Preparando la aplicacion'}/> :
                !isAuthenticated ? <InprogressFallback status={'Autenticando Usuario'}/> :
                <BaseRoute />}
            </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
