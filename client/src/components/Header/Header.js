import { useState } from 'react';
// Components
import Navbar from '../Navbar'
// Assets
import { ReactComponent as MenuIcon } from '../../assets/menu-icon.svg'
// Styling
import './Header.scss'

const Header = (props) => {
    const { search: SearchBar, profileMenu: ProfileMenu} = props;
    const [ isCollapse, setToggleNavBar] = useState(true)

    return (
        <>
            <header>
                <div className='header-menu'>
                    <button type='button' onClick={() => setToggleNavBar(!isCollapse)}><MenuIcon/></button>
                </div>
                <div className='header-title'><h1>What I Saw App</h1></div>
                <div className='header-search'><SearchBar/></div>
                <div className='header-profile'><ProfileMenu /></div>
            </header>
            <Navbar isCollapse={isCollapse}/>
        </>

    )
}

export default Header;