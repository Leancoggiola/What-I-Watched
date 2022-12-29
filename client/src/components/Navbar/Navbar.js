import { useSelector } from 'react-redux';
// Styling
import './Navbar.scss'

const Navbar = ({isCollapse}) => {

    const { loading, data, error } = useSelector((state) => state.apps.list)
    return (
        <nav className={`navigation ${isCollapse ? 'navigation-collapse' : 'navigation-expanded'}`}>
        </nav>
    )
}

export default Navbar;