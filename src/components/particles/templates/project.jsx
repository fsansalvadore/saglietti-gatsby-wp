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
  }

  .proj_content-container {
    position: relative;
    width: 60vw;
    min-height: 100vh;
    padding-bottom: 4rem;
    overflow: hidden;

    .proj_cover {
      width: 100%;
      min-height: 300px;
      height: 50vh;
      background-size: cover;
      background-position: center;
    }
  }
`

const ProjectPage = props => {
  const {
    blocks,
    custom_post_type_Project,
    featuredImage
  } = props.pageContext;
  
  console.log("featuredImage:")
  console.log(featuredImage)

  return (
    <Layout>
      <ProjectContainerComponent>
        <div className="proj_info-container flex align-center">
          <div className="proj_info-block">
            <div className="title">
              <h1>{custom_post_type_Project.titolo}</h1>
            </div>
            <div className="proj_details-container">

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