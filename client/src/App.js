import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty } from 'lodash';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Components 
import Theme from './commonComponents/Theme';
import BaseRoute from './components/BaseRoute';
import ErrorFallback from './components/ErrorFallback';
import InprogressFallback from './components/InprogressFallback';
// Pages
import Login from './views/Login';

// Middleware
import { isUserLoggedInRequest } from './middleware/actions/authActions';
import { getAppsRequest, getStatusRequest } from './middleware/actions/metaActions';

// Styles
import './App.scss';

export default () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth)
  const appList = useSelector((state) => state.meta.appList)
  const statusList = useSelector((state) => state.meta.statusList)

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
      isEmpty(statusList.data && !statusList.loading) && dispatch(getStatusRequest())
    }
  }, [loggedUser])

  return (
    <div style={{ position: 'relative' }}>
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
                !appList.data || !statusList.data ? <InprogressFallback status={'Preparando la aplicacion'}/> :
                !loggedUser.data ? <InprogressFallback status={'Autenticando Usuario'}/> :
                <BaseRoute />}
            </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
