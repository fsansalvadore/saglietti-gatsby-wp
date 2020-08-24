import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import ArrowRightCircle from '../../atoms/arrow-right-circle.component'
import ArrowLeftCircle from '../../atoms/arrow-left-circle.component'

const PrevNextProjectContainer = styled.div`
    padding: 60px 4rem;
    display: flex;
    width: 100%;
    justify-content: space-between;

    .arrow-right {
        margin-left: 10px;
    }
    a {
        flex-shrink: 1;
        display: inline-flex;
        align-items: center;
        font-size: 1.5rem;
        text-decoration: none;

        span {
            margin: 0 10px;
        }
    }

    .prev {
        align-self: start;
    }

    .next {
        align-self: flex-end;
        text-align: right;
        justify-content: flex-end;
    }
`

const PrevNextProject = ({prev, next}) => {
    return (
        <PrevNextProjectContainer prev>
            <div className="prev">
            {
                prev &&
                <Link to={`/progetti/${prev.slug}`}><ArrowLeftCircle/> {prev.title}</Link>
            }
            </div>
            <div className="next">
            {
                next &&
                <Link to={`/progetti/${next.slug}`}>{next.title} <ArrowRightCircle/></Link>
            }
            </div>
        </PrevNextProjectContainer>
    )
}

export default PrevNextProject