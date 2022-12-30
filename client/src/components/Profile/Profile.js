import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
// Components
import { GrLogout } from 'react-icons/gr';
import Avatar from '../Avatar';
import { Dropdown, DropdownItem} from '../Dropdown';
// Styling
import './Profile.scss'

const Profile = () => {

    const [ isProfileMenuOpen, setProfileMenuOpen ] = useState(false);
    const { user, logout } = useAuth0();
    const history = useHistory()

    const userMail = user?.email ? user.email.split(/[.@]/) : '';
    const userId = userMail[0] + ' ' + userMail[1];

    const logoutUser = () => {
        localStorage.clear()
        sessionStorage.clear()
        logout({ returnTo: window.location.origin + '/login', localOnly: true})
        history.push('/login')
        return;
    }

    const profileMenuOptions=[{
            id: 'header-profile-logout',
            optionFn: logoutUser,
            icon: <GrLogout/>,
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
                />
            }
        >
            {profileMenuOptions.map(menuOption => {
                const { id, optionFn, icon, description } = menuOption;
                return(
                    <DropdownItem key={id} onClick={() => { setProfileMenuOpen(false); optionFn()}}>
                        <span>{icon}</span>
                        <span>{description}</span>
                    </DropdownItem>
                )
            })}
        </Dropdown>
    )
}

export default Profile;