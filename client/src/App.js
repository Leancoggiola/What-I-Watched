import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Login from './Pages/Login';
import Home from './Pages/Home';

// Components 
import Theme from './components/Theme';

// Styles
import './App.scss'

function App() {

  return (
    <>
      <Theme variant='default'/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
