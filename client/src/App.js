import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components 
import Theme from './components/Theme';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
// Middleware
import { getAppsRequest } from './middleware/actions/appsActions';

// Styles
import './App.scss'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppsRequest())
  }, [])

  return (
    <>
      <Theme variant='default'/>
      <Header search={SearchBar}/>
    </>
  );
}

export default App;
