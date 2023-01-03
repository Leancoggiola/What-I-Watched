import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Components
import { actionIcExitApp } from '../../assets/icons';
import Avatar from '../../commonComponents/Avatar';
import { Dropdown, DropdownItem } from '../../commonComponents/Dropdown';
import Icon from '../../commonComponents/Icon';
// Middleware
import { logOutUserRequest } from '../../middleware/actions/authActions';
// Styling
import './Profile.scss';

const Profile = () => {

    const [ isProfileMenuOpen, setProfileMenuOpen ] = useState(false);
    const { user, logout } = useAuth0();
    const dispatch = useDispatch()
    const history = useHistory()

    const userMail = user?.email ? user.email.split(/[.@]/) : '';
    const userId = userMail[0] + ' ' + userMail[1];

    const logoutUser = () => {
        dispatch(logOutUserRequest())
        logout({ returnTo: window.location.origin + '/login', localOnly: true})
        history.push('/login')
        return
    }

    const profileMenuOptions=[{
            id: 'header-profile-logout',
            optionFn: logoutUser,
            icon: actionIcExitApp,
            description: 'Logout'
    }]

    return (
        <Dropdown 
            open={isProfileMenuOpen}
            id={'header-profile-dropdown'}
            handleClickOutside={() => setProfileMenuOpen(false)}
            className='header-profile-dropdown'
            trigger={
                <Avatar 
                    onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                    name={userId}
                    user={user}
                />
            }
        >
            {profileMenuOptions.map(menuOption => {
                const { id, optionFn, icon, description } = menuOption;
                return(
                    <DropdownItem key={id} onClick={() => { setProfileMenuOpen(false); optionFn()}}>
                        <Icon src={icon} />
                        <span>{description}</span>
                    </DropdownItem>
                )
            })}
        </Dropdown>
    )
}

export default Profile;