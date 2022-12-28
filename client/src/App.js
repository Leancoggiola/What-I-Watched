import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components 
import Theme from './components/Theme';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
// Assets
import { ReactComponent as AppIcon } from './assets/app-icon.svg'

// Styles
import './App.scss'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

  }, [])

  return (
    <>
      <Theme variant='default'/>
      <Header logo={AppIcon} search={SearchBar}/>
    </>
  );
}

export default App;
