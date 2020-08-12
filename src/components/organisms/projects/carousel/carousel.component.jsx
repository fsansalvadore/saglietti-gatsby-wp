import React from 'react'
import styled from 'styled-components'
import parse from 'html-react-parser';

const SliderBlock = styled.div`
    position: relative;
    display: block;
    width: 100%;
    min-height: 300px;

    .wp-block-eedee-block-gutenslider {
        height: 50vh;
        min-height: 200px;
    }
`

const Carousel = ({name, saveContent }) => {
    
    console.log('saveContent:')
    console.log(saveContent)

    return (
        <SliderBlock>
            {parse(saveContent)}
        </SliderBlock>
    )
}

export default Carousel