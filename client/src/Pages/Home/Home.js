import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
        null
    )
}

export default Home;