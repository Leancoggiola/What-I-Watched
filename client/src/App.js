import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';

// Components 
import Theme from './commonComponents/Theme';
import BaseRoute from './components/BaseRoute';
import InprogressFallback from './components/InprogressFallback';
import ErrorFallback from './components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
// Pages
import Login from './pages/Login';

// Middleware
import { getAppsRequest } from './middleware/actions/appsActions';
import { isUserLoggedInRequest } from './middleware/actions/authActions';

// Styles
import './App.scss'

export default props => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.auth0)
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
      dispatch(getAppsRequest())
    }
  }, [loggedUser])

  if(window.location.pathname == '/login') {
    return(
      <>
        <Theme variant='default'/>
        <Login />
      </>
    )
  }

  if(!isAuthenticated) {
    return (<InprogressFallback status={'Autenticando Usuario'}/>)
  }

  if(!loggedUser.data || !appList.data) {
    return <InprogressFallback status={'Preparando la aplicacion'}/>
  }

  return (
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
              <BaseRoute />
          </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
