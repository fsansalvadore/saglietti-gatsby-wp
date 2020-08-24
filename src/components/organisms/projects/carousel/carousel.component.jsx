import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import Reveal from 'react-reveal/Reveal';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBlock = styled.div`
    position: relative;
    display: block;
    width: 100%;
    max-height: 300px;
    padding: 0 4rem;
    overflow: visible;

    .slick-slider,
    .slick-list {
        max-height: 300px;
        overflow: visible;
    }

    .slick-slider {
        overflow: visible;
    }

    .slick-slide {
        padding: 10px;
    }
    * {
        outline: none !important;
        box-shadow: none !important;
    }
`

const Carousel = ({name, saveContent, dynamicContent, innerBlocks }) => {
    var settings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerPadding: "70px",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    };

    return (
        <Reveal effect="anim_enter">
            <SliderBlock>
                <Slider {...settings}>
                    {
                        innerBlocks.map(slide => (
                            <div key={JSON.parse(slide.attributes.background).backgroundImage.id}>
                                <img src={JSON.parse(slide.attributes.background).backgroundImage.link} alt=""/>
                            </div>
                        ))
                    }
                </Slider>
            </SliderBlock>
        </Reveal>
    )
}

export default Carousel