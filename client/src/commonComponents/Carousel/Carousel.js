import Slider from 'react-slick';
// Components
import { navigationIcKeyboardArrowLeft, navigationIcKeyboardArrowRight } from '../../assets/icons';
import Icon from '../Icon';
import IconButton from '../IconButton';
// Styling
import './Carousel.scss';

const Carousel = (props) => {
    const { children, slidesToShow, rows, extraSettings } = props;
    
    const settings = {
        className: 'cc-carousel',
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow || 4,
        slidesToScroll: 1,
        rows: rows || 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        ...extraSettings
    }

    return (
        <Slider {...settings} arrows>
            {children}
        </Slider>
    )
}

const NextArrow = (props) => {
    const { className, onClick } = props;
    return(
        <IconButton className={`${className} cc-carousel-next-btn`} role='button' onClick={onClick}>
            <Icon src={navigationIcKeyboardArrowRight} />
        </IconButton>
    )
}

const PrevArrow = () => {
    const { className, onClick } = props;
    return(
        <IconButton className={`${className} cc-carousel-previous-btn`} role='button' onClick={onClick}>
            <Icon src={navigationIcKeyboardArrowLeft} />
        </IconButton>
    )
}

export default Carousel;