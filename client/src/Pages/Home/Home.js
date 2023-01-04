import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Middleware
import { getUserListRequest } from '../../middleware/actions/listActions';
// Styling
import ErrorMessage from '../../commonComponents/ErrorMessage';
import LoadingSpinner from '../../commonComponents/LoadingSpinner';
import './Home.scss';

const Home = () => {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.list.userList);

    useEffect(() => {
        if(isEmpty(data)) {
            dispatch(getUserListRequest(user.email))
        }
    }, [])

    return (
        <>
            {loading ? 
                <LoadingSpinner /> :
            error ? 
                <ErrorMessage message={error.message} /> :
            !isEmpty(data) ? 
                <div></div> 
                :
                <div>Empty list</div>
            }
        </>
    )
}

export default Home;