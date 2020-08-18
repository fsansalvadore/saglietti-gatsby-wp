import React from 'react'
import parse from 'html-react-parser'

const Gallery = ({originalContent}) => {
    return(
        <div>
            {parse(originalContent)}
        </div>
    )
}

export default Gallery