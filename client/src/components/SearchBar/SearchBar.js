import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import SuggestionList from './SuggestionList';
import IconButton from '../../commonComponents/IconButton';
import Icon from '../../commonComponents/Icon';

import { actionIcSearch } from '../../assets/icons';
// Middleware
import { getContentSearchRequest } from '../../middleware/actions/searchActions';
// Styling
import './SearchBar.scss'

const SearchBar = () => {
    const [ searchWord, setSearchWord ] = useState("");
    const [ displayValue, setDisplayValue ] = useState("");
    const [ isSuggestListOpen, setSuggestListOpen ] = useState(false);

    const dispatch = useDispatch();
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearchWord(displayValue)
        }, [500])
        return () => {
            clearTimeout(timeoutId);
        }
    }, [displayValue])

    useEffect(() => {
        if(searchWord) {
            setSuggestListOpen(true)
            dispatch(getContentSearchRequest(searchWord))
        } else {
            setSuggestListOpen(false)
        }
    }, [searchWord])

    const clickOutside = (event, target) => {
        if(event?.target && target?.current && !target.current.contains(event.target)) {
            setSuggestListOpen(false)
        }
    }

    return (
        <div className='search-bar-container'>
            <div className='search-bar-input-wrapper'>
                <input 
                    type='text' 
                    placeholder='Busca series y peliculas..' 
                    maxLength={50} 
                    value={displayValue}
                    onChange={(e) => setDisplayValue(e.target.value)}
                />
                <IconButton type='button' className={'search-icon-btn'} onClick={() => setToggleNavBar(!isCollapse)} >
                    <Icon src={actionIcSearch} />
                </IconButton>
            </div>
            {isSuggestListOpen && (
                <SuggestionList 
                    clickOutside={clickOutside}
                    loading={searchState.loading}
                    data={searchState.data}
                />
            )}
        </div>
    )
}

export default SearchBar;