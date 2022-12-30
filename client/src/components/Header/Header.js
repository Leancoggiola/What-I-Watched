import { Fragment, useState } from 'react';
// Components
import Navbar from '../Navbar'
// Styling
import './Header.scss'

const Header = (props) => {
    const { search: SearchBar, profileMenu: ProfileMenu} = props;
    const [ isCollapse, setToggleNavBar] = useState(true)

    return (
        <Fragment>
            <header>
                <div className='header-menu'>
                    <button type='button' onClick={() => setToggleNavBar(!isCollapse)}></button>
                </div>
                <div className='header-title'><h1>What I Saw App</h1></div>
                <div className='header-search'><SearchBar/></div>
                <div className='header-profile'><ProfileMenu /></div>
            </header>
            <Navbar isCollapse={isCollapse}/>
        </Fragment>

    )
}

export default Header;