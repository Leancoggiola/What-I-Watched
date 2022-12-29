import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useAuth0 } from '@auth0/auth0-react';

// Pages
import Login from './Pages/Login';
import Home from './Pages/Home';
import LoadingSpinner from './components/LoadingSpinner'

// Components 
import Theme from './components/Theme';

// Middleware
import { isUserLoggedInRequest } from './middleware/actions/authActions'

// Styles
import './App.scss'

function App() {
  const dispatch = useDispatch()
  const { loginWithRedirect } = useAuth0();

  const { loading, data, error } = useSelector((state) => state.auth)

  const isUserLoggedIn = useCallback(() => {
    dispatch(isUserLoggedInRequest({ loginWithRedirect }))
  })

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

  const getRoutes = () => {
    if(!isEmpty(data)) {
      return(
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<Home />}/>
        </Routes>)
    } else {
      return(
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<Login />}/>
        </Routes>
      )
    }
  }

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Theme variant='default'/>
      <BrowserRouter>
        {getRoutes()}
      </BrowserRouter>
      
    </>
  );
}

export default App;
