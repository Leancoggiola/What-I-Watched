import React, { Children } from 'react';
import Slider from 'react-slick';
// Components
import { navigationIcKeyboardArrowLeft, navigationIcKeyboardArrowRight } from '../../assets/icons';
import Icon from '../Icon';
import IconButton from '../IconButton';
// Styling
import './Carousel.scss';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Carousel = (props) => {
  const { children, slidesToShow, rows, extraSettings} = props;

  const settings = {
    adaptiveHeight: true,
    className: 'cc-carousel',
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow || 4,
    slidesToScroll: 1,
    rows: rows || 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [{
        breakpoint: 1366,
        settings: { 
          slidesToShow: slidesToShow || 4,
          infinite: Children.count(children) > slidesToShow || 4,
        }
      }, {
        breakpoint: 1024,
        settings: { 
          slidesToShow: 2,
          infinite: Children.count(children) > 2,
        }
      }, {
        breakpoint: 768 ,
        settings: { 
          slidesToShow: 1,
          infinite: Children.count(children) > 1,
        }
      }
    ],
    ...extraSettings
  };

  return (
    <Slider {...settings} arrows={true}>
      {children}
    </Slider>
  );
};

export default Carousel;

const NextArrow = (props) => {
    const { className, onClick } = props;
    return(
        <IconButton className={`${className} cc-carousel-arrow-btn next-arrow`} role='button' onClick={onClick}>
            <Icon src={navigationIcKeyboardArrowRight} />
        </IconButton>
    )
}

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return(
        <IconButton className={`${className} cc-carousel-arrow-btn prev-arrow`} role='button' onClick={onClick}>
            <Icon src={navigationIcKeyboardArrowLeft} />
        </IconButton>
    )
}