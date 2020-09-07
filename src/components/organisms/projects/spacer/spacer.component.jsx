import React from 'react';
import parse from 'html-react-parser';
import Reveal from 'react-reveal/Reveal';

const Spacer = ({name, originalContent}) => {
    return (
        <>
            {parse(originalContent)}
        </>
    )
}

export default Spacer