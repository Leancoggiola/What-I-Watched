// Components
import Carousel from '../../commonComponents/Carousel'
import ContentCard from '../ContentCard/ContentCard';
// Styling
import './ListCarousel.scss'

const ListCarousel = (props) => {
    const { list, appStyle } = props;
    const slidesToShow = 6;

    return (
        <>
        {list.length > 0 &&
            <section className='list-carousel-container' style={{...appStyle}}> 
                <Carousel slidesToShow={slidesToShow}>
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