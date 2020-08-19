import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

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
      font-weight: 400;
      letter-spacing: -0.06rem;
    }

    .proj_details-container {
      display: flex;

      .proj_details-block {
        flex: 1;
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

  .proj_content-container {
    position: relative;
    width: 60vw;
    min-height: 100vh;
    overflow: hidden;

    .proj_cover {
      width: 100%;
      min-height: 300px;
      height: 50vh;
      background-size: cover;
      background-position: center;
      margin-bottom: 4rem;
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
        </div>
        <VerticalLine initial={{x: "-40vw"}} animate={{ x: 0 }} transition={{ duration: 0.8 }} style={{left: "40%"}} />
        <div className="proj_content-container">
          <div className="proj_cover" style={{backgroundImage: `url(${featuredImage.node.link})`}}>

          </div>
          <ComponentParser content={blocks}/>
        </div>
      </ProjectContainerComponent>
      <Link to="/">Go to Home Page</Link>
    </Layout>
  )
}

export default ProjectPage