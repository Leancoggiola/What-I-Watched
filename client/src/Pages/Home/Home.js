import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Profile from '../../components/Profile';
// Middleware
import { getAppsRequest } from '../../middleware/actions/appsActions';
// Styling
import './Home.scss'

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppsRequest())
      }, [])

    return (
        <Header search={SearchBar} profileMenu={Profile} />
    )
}

export default Home;