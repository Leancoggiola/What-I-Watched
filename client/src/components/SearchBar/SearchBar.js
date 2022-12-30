import { HiSearch } from 'react-icons/hi';
// Styling
import './SearchBar.scss'

const SearchBar = () => {
    return (
        <div className='search-bar'>
            <input type='text' placeholder='Busca series y peliculas..'></input>
            <button type='submit' className='icon-btn'><HiSearch/></button>
        </div>
    )
}

export default SearchBar;