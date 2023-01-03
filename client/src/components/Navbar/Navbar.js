import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Buffer } from 'buffer';
// Assets
import allAppsLogo from '../../assets/all-apps-icon.png';
// Styling
import './Navbar.scss'


const Navbar = ({isCollapse}) => {
    const [ activeIndex, setActiveIndex] = useState(0);
    const { data } = useSelector((state) => state.apps.list);

    const handleClick = (index) => {
        setActiveIndex(index);
    }

    const getActiveButton = (activeIndex, index) => {
        return activeIndex === index ? 'active' : '';
    }

    return (
        <nav className={`navigation ${isCollapse ? 'navigation-collapse' : 'navigation-expanded'}`}>
            <button type='button' className={`${getActiveButton(activeIndex, 0)}`} onClick={() => handleClick(0)}>
                <div className='icon-container'>  
                    <img src={allAppsLogo} alt='all-apps'/>
                </div>
                <h2>All Applications</h2>
            </button>
            {!isEmpty(data) && data.map((option,index) => {
                const { name, displayName, image: { contentType, data }} = option;
                const imgSrc = `data:${contentType};base64, ${Buffer.from(data.data).toString('base64')}`;
                return(
                    <button 
                        type='button' 
                        className={`${getActiveButton(activeIndex, index+1)}`} 
                        key={name}
                        onClick={() => handleClick(index+1)}
                    >
                        <div className='icon-container'>  
                            <img src={imgSrc} alt={`${name}-app`}/>
                        </div>
                        <h2>{displayName}</h2>
                    </button>
                )
            })}
        </nav>
    )
}

export default Navbar;