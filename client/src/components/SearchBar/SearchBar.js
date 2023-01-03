import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import SuggestionList from './SuggestionList';
import ResultInfoModal from '../ResultInfoModal';
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
    const [ itemInfo, setItemInfo ] = useState({ show: false, item: null});
    const [ isSuggestListOpen, setSuggestListOpen ] = useState(false);

    const dispatch = useDispatch();
    const searchState = useSelector((state) => state.search.resultsList);

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

    const showResultInfo = (item) => {
        setItemInfo({ show: true, item})
    }

    return (
        <>
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
                        showResultInfo={showResultInfo}
                    />
                )}
            </div>
            <ResultInfoModal {...itemInfo} onClose={() => setItemInfo({ show: false, item: null})}/>
        </>
    )
}

export default SearchBar;