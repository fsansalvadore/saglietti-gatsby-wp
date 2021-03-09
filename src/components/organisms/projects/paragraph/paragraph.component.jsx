import React from 'react';
import parse from 'html-react-parser';
import Reveal from 'react-reveal/Reveal';

import ParagraphStyled from './paragraph.styled'

const Paragraph = ({ originalContent }) => {
    return (
        <ParagraphStyled>
            <Reveal effect="anim_enter">
                {parse(originalContent)}
            </Reveal>
        </ParagraphStyled>
    )
}

export default Paragraph