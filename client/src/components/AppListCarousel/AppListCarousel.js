// Components
import Carousel from '../../commonComponents/Carousel'
import ContentCard from '../ContentCard/ContentCard';
// Styling
import './AppListCarousel.scss'

const AppListCarousel = (props) => {
    const { list } = props;
    const slidesToShow = 6;

    return (
        <div className='app-list-carousel-container'> 
            <Carousel slidesToShow={slidesToShow}>
                {list.length && list.map(item => (
                    <ContentCard item={item} key={item.title}/>
                ))}
            </Carousel>
        </div>
    )
}

export default AppListCarousel;