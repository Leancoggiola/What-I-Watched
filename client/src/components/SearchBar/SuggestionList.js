import { isEmpty } from 'lodash';
import { forwardRef, useEffect, useRef } from 'react';
// Components
import LoadingSpinner from '../LoadingSpinner';
// Styling
import './SearchBar.scss'

const SuggestionList = forwardRef((props) => {
    const { clickOutside, loading, data } = props;
    const target = useRef(null)

    useEffect(() => {
        document.addEventListener('click', (e) => clickOutside(e, target))
        return () => document.removeEventListener('click', clickOutside)
    }, [])

    return (
        <div className='search-bar-suggestion-list' ref={target}>
            {loading ? 
            <LoadingSpinner/>
            :
            !isEmpty(data) ? 
                <div className='search-bar-result-container'>
                    {data.map((item) => (
                        <div className='search-bar-result-item' key={item.id}>
                            <span>{item.title}</span>
                            <span>{item.titleType}</span>
                        </div>
                    ))}
                </div>
                :
                <div className='search-bar-no-results'>
                    <h4>No se encontraron resultados</h4>
                </div>
            }
        </div>
    )
})

export default SuggestionList;