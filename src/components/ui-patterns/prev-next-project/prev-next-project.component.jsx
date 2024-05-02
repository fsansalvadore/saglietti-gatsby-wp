import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import ArrowRightCircle from "../../ui/arrow-right-circle.component"
import ArrowLeftCircle from "../../ui/arrow-left-circle.component"

const PrevNextProjectContainer = styled.div`
  padding: 60px 1rem;
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
    font-size: 1rem;
    text-decoration: none;

    span {
      margin: 0 10px;
      transition: all 0.3s ease;
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
    }
  }

  .prev {
    align-self: start;

    a:hover span {
      transform: translate3d(-10px, 0, 0);
    }
  }

  .next {
    align-self: flex-end;
    text-align: right;
    justify-content: flex-end;

    a:hover span {
      transform: translate3d(10px, 0, 0);
    }
  }

  @media (min-width: 900px) {
    padding: 60px 2rem;

    a {
      font-size: 1.3rem;
    }
  }
`

const PrevNextProject = ({ prev, next }) => {
  return (
    <PrevNextProjectContainer prev>
      <div className="prev">
        {prev && (
          <Link to={`/progetti/${prev.slug}`}>
            <ArrowLeftCircle /> {prev.title}
          </Link>
        )}
      </div>
      <div className="next">
        {next && (
          <Link to={`/progetti/${next.slug}`}>
            {next.title} <ArrowRightCircle />
          </Link>
        )}
      </div>
    </PrevNextProjectContainer>
  )
}

export default PrevNextProject
