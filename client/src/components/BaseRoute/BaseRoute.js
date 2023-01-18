import { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Profile from '../../components/Profile';

// Pages
const Home = lazy(() => import('../../views/Home'));

const BaseRoute = () => {
  return(
    <>
      <Header search={SearchBar} profileMenu={Profile} />      
      <Switch>
        <Route 
          path='/' 
          component={Home}
          exact
        />
        <Route path='*'><Redirect to='/'/></Route> 
      </Switch>
    </>
  )
}

export default BaseRoute;