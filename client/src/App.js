import React, { useCallback, useEffect, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

// Pages
import Login from './pages/Login';

// Components 
import Theme from './components/Theme';
import BaseRoute from './components/BaseRoute';
import InprogressFallback from './components/InprogressFallback';
import ErrorFallback from './components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

// Middleware
import { isUserLoggedInRequest } from './middleware/actions/authActions'

// Styles
import './App.scss'

function App() {
  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0();

  const loggedUser = useSelector((state) => state.auth)

  const isUserLoggedIn = useCallback(
    () => dispatch(isUserLoggedInRequest({ loginWithRedirect }))[dispatch]
  )

  const verifyUserLoggedIn = useCallback( async () => {
    await isUserLoggedIn()
  })

  useEffect(() => {
    if(window.location.pathname != '/login' && window.navigator.onLine) {
      verifyUserLoggedIn();
    }
    return () => {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [])

  if(window.location.pathname == '/login') {
    return <Login />
  }
  if(!loggedUser.data) {
    return <InprogressFallback status={'Preparando la Aplicacion'}/>
  }

  return (
    <ErrorBoundary 
      fallbackRender={({error, resetErrorBoundary}) => (
        <ErrorFallback error={error }resetErrorBoundary={resetErrorBoundary} />
      )}  
    >
      <BrowserRouter>
        <Theme variant='default'/>
          <Suspense fallback={
            <InprogressFallback status={'Autentificando Usuario'}/>
          }>
            <BaseRoute />
          </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
