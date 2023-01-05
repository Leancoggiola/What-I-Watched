import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import ErrorMessage from '../../commonComponents/ErrorMessage';
import LoadingSpinner from '../../commonComponents/LoadingSpinner';
import AppListCarousel from '../../components/AppListCarousel/AppListCarousel';
// Middleware
import { getUserListRequest } from '../../middleware/actions/listActions';
// Styling
import './Home.scss';

const Home = () => {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.list.userList);
    const crudState = useSelector((state) => state.list.crud);
    const appList = useSelector((state) => state.meta.appList)
    const appToDisplay = useSelector((state) => state.list.display);

    useEffect(() => {
        if(isEmpty(data)) {
            dispatch(getUserListRequest(user.email))
        }
    }, [])

    if(loading || crudState.loading) return <LoadingSpinner />

    if(error) return <ErrorMessage message={error.message} />

    return (
        <>
            {!isEmpty(data) && 
            <main className='home-container page'>
                {appList.data.map(app => {
                    if(appToDisplay === 'all' || appToDisplay === app.name ) {
                        return (
                            <AppListCarousel 
                                list={data.contentList.filter(item => item.appName === app.name)} 
                                title={app.displayName} 
                                id={app.name}
                                key={app.name}
                            />
                        )}
                    })
                }
            </main>}
        </>
    )
}

export default Home;