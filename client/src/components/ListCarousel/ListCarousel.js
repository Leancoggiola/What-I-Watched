import { useMutationObserver }  from '../../hooks/useMutationObserver';
// Components
import Carousel from '../../commonComponents/Carousel';
import ContentCard from '../ContentCard/ContentCard';
// Styling
import './ListCarousel.scss'
import { useState } from 'react';

const ListCarousel = (props) => {
    const { list, appStyle } = props;
    const slidesToShow = 6;
    const [ swipe, setSwipe] = useState(true)

    const handleBodyStyleMutation = (mutation) => {
        if(mutation.type === 'attributes' && mutation.attributeName === 'style') {
            ((document.body.style.overflow === '') !== swipe ) && setSwipe(!swipe)
        }
    }

    useMutationObserver (document.body, { attributes: true }, handleBodyStyleMutation)

    return (
        <>
        {list.length > 0 &&
            <section className='list-carousel-container' style={{...appStyle}}> 
                <Carousel slidesToShow={slidesToShow} extraSettings={{swipe: swipe}}>
                    {list.length && list.map(item => (
                        <ContentCard item={item} key={item.title}/>
                    ))}
                </Carousel>
            </section>
        }
        </>
    )
}

export default ListCarousel;