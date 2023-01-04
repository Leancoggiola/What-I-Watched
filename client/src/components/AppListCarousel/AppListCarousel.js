// Components
import Carousel from '../../commonComponents/Carousel'
import ContentCard from '../ContentCard/ContentCard';
// Styling
import './AppListCarousel.scss'

const AppListCarousel = (props) => {
    const { list } = props;
    const slidesToShow = 6;
    const infinite = list.length > slidesToShow;

    return (
        <Carousel slidesToShow={slidesToShow} extraSettings={{infinite}}>
            {list.map(item => (
                <ContentCard item={item} key={item.title}/>
            ))}
        </Carousel>
    )
}

export default AppListCarousel;