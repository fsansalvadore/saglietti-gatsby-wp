import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBlock = styled.div`
    position: relative;
    display: block;
    width: 100%;
    min-height: 300px;
    max-height: 300px;
    padding: 1rem 4rem;
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
`

const Carousel = ({name, saveContent, dynamicContent, innerBlocks }) => {
    var settings = {
        dots: false,
        infinite: false,
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

    // const sliderRef = useRef(parse(dynamicContent));
    console.log('innerBlocks:')
    console.log(innerBlocks)

    console.log(JSON.parse(innerBlocks[0].attributes.background).backgroundImage)

    return (
        <SliderBlock>
            <Slider {...settings}>
                {
                    innerBlocks.map(slide => (
                        <div key={JSON.parse(slide.attributes.background).backgroundImage.id}>
                            <img src={JSON.parse(slide.attributes.background).backgroundImage.link}/>
                        </div>
                    ))
                }
            </Slider>
        </SliderBlock>
    )
}

export default Carousel