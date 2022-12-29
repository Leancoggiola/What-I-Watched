// Styling
import './SearchBar.scss'

const SearchBar = () => {
    return (
        <div class='search-bar'>
            <input type='text' placeholder='Busca series y peliculas..'></input>
            <button type='submit'></button>
        </div>
    )
}

export default SearchBar;