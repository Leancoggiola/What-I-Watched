import { useState } from 'react';
// Components
import Navbar from '../Navbar'
// Styling
import './Header.scss'

const Header = (props) => {
    const { search: SearchBar} = props;
    const [ isCollapse, setToggleNavBar] = useState(true)

    return (
        <>
            <header>
                <div className='header-menu'>
                    <button type='button' onClick={() => setToggleNavBar(!isCollapse)}></button>
                </div>
                <div className='header-title'><h1>What I Saw App</h1></div>
                <div className='header-search'><SearchBar/></div>
            </header>
            <Navbar isCollapse={isCollapse}/>
        </>

    )
}

export default Header;