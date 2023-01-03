import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Profile from '../../components/Profile';

// Pages
const Home = lazy(() => import('../../pages/Home'));

const BaseRoute = () => {
  return(
    <div>
      <Header search={SearchBar} profileMenu={Profile} />      
      <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='*' element={<Navigate to='/' replace/>}/> 
      </Routes>
    </div>
  )
}

const ProtectedRoute = (props) => {
  const {
    component: Component,
    render,
    permission,
    fallbackPath,
    noAccessProps,
    ...restProps
  } = props
  
const { data: permissions = [], loading } = useSelector();

if(loading) return null

}

export default BaseRoute;