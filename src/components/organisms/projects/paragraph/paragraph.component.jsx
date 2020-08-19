import React from 'react';
import parse from 'html-react-parser';

import ParagraphStyled from './paragraph.styled'

const Paragraph = ({name, originalContent}) => {
    
    // console.log('From paragraph component:')
    // console.log(name)

    return (
        <ParagraphStyled>
            {parse(originalContent)}
        </ParagraphStyled>
    )
}

export default Paragraph