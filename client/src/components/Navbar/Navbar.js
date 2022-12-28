// Styling
import "./Navbar.scss"

const Navbar = ({isCollapse}) => {
    return (
        <nav className={`navigation ${isCollapse ? "navigation-collapse" : "navigation-expanded"}`}>
        </nav>
    )
}

export default Navbar;