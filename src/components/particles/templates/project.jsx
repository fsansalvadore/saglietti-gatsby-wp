import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import ArrowRight from '../../atoms/svg/arrow-right.component'
import Layout from "../../layout"
import VerticalLine from '../../atoms/vertical-line.component'
import ComponentParser from '../ComponentParser'

const ProjectContainerComponent = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  border-bottom: 1px solid #000;

  .proj_info-container {
    position: sticky;
    top: 0;
    min-height: 600px;
    height: 100vh;
    width: 40vw;
    padding: 1.45rem 2rem;

    h1 {
      font-family: 'FFMarkWebProLight';
      font-weight: 200;
      letter-spacing: -0.06rem;
    }

    .proj_info-block {
      width: 100%;
    }

    .proj_details-container {
      display: flex;

      .proj_details-block {
        width: 25%;
        margin-right: 10px;       
        font-family: 'FFMarkWebProLight';
        font-size: 0.7rem;
        line-height: 1rem;

        h2 {
          font-weight: 200;
          font-size: inherit;
          margin-bottom: 0;
          line-height: inherit;
        }
        p {
          margin: 0;
          line-height: inherit;
        }
        ul, li {
          margin: 0;
          line-height: inherit;
          padding: 0;
          list-style-type: none;
        }
      }
    }
  }

  .proj_breadbrumbs {
    position: absolute;
    bottom: 30px;
    left: 30px;

    a, svg {
      display: inline;
    }

    a, span {
      text-decoration: none;
      font-size: 0.7rem;
      font-weight: 200;
      letter-spacing: -0.02rem;
    }

    svg {
      margin: 0 10px;
    }
  }

  .proj_content-container {
    position: relative;
    width: 60vw;
    min-height: 100vh;
    overflow: hidden;

    .proj_cover {
      width: 100%;
      min-height: 300px;
      height: 50vh;
      margin-bottom: 4rem;
      
      .proj_cover-img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        animation-name: coverReveal;
        animation-duration: 0.6s;
        animation-timing-function: cubic-bezier(0,0,.01,1);
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes coverReveal {
    0% {
      height: 0%;
    }
    100% {
      height: 100%;
    }
  }
`

const ProjectPage = props => {
  const {
    blocks,
    custom_post_type_Project,
    featuredImage
  } = props.pageContext;
  
  // console.log("featuredImage:")
  // console.log(featuredImage)
  console.log("custom_post_type_Project:")
  console.log(custom_post_type_Project)

  return (
    <Layout>
      <ProjectContainerComponent>
        <div className="proj_info-container flex align-center">
          <div className="proj_info-block">
            <div className="title">
              <h1>{custom_post_type_Project.titolo}</h1>
            </div>
            <div className="proj_details-container">
              {
                custom_post_type_Project.credits && custom_post_type_Project.credits.length > 0 &&
                  <div className="proj_details-block">
                    <h2>Credits</h2>
                    <p>{custom_post_type_Project.credits}</p>
                  </div>
              }
              {
                custom_post_type_Project.anno && custom_post_type_Project.anno.length !== null &&
                  <div className="proj_details-block">
                    <h2>Anno</h2>
                    <p>{custom_post_type_Project.anno}</p>
                  </div>
              }
              {
                custom_post_type_Project.ambiti && custom_post_type_Project.ambiti.length > 0 &&
                  <div className="proj_details-block">
                    <h2>Ambiti</h2>
                    <ul>
                      {custom_post_type_Project.ambiti.map(ambito => (
                        <li>{ambito}</li>
                      ))}
                    </ul>
                  </div>
              }
            </div>
          </div>
          <div className="proj_breadbrumbs">
            <Link to="/">Home</Link>
            <ArrowRight/>
            <Link to="/progetti/">Progetti</Link>
            <ArrowRight/>
            <span>{custom_post_type_Project.titolo}</span>
          </div>
        </div>
        <VerticalLine initial={{x: "0"}} animate={{ x: 0 }} transition={{ duration: 0.8 }} style={{left: "40%"}} />
        <div className="proj_content-container">
          <div className="proj_cover">
            <div className="proj_cover-img" style={{backgroundImage: `url(${featuredImage.node.link})`}}></div>
          </div>
          <ComponentParser content={blocks}/>
        </div>
      </ProjectContainerComponent>
      <Link to="/">Go to Home Page</Link>
    </Layout>
  )
}

export default ProjectPage