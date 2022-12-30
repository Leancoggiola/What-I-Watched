import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <Switch>
            <Route path='/' element={<Home />}/>
        </Switch>
      </div>
    )
  }

export default BaseRoute;