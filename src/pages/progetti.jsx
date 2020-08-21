import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
// import { gsap } from "gsap"
// import Charming from '../components/particles/hooks/charming.min.js'
// import TweenMax from '../components/particles/hooks/TweenMax.min.js'
import LinkHover from '../components/particles/hooks/linkHoverImageFX'

import '../components/particles/styles/projects.styles.scss'
import ProjectsContainer from '../components/organisms/projects/projects-container/projects-container.component'

const Progetti = ({data}) => {
  console.log(data)

  // Charming()
  // TweenMax()
  LinkHover()
  
  return (
    <Layout>
      <ProjectsContainer>
        <h1>Progetti</h1>
        <ul className="proj_content">
          {
            data.wordpress.projects.nodes.map(proj => (
              <li key={proj.id}>
                <div className="prog_list-item">
                  <Link
                    to={`/progetti/${proj.slug}`}
                    className="block__title"
                    data-img={proj.featuredImage.node.link}
                    >{proj.title}</Link>
                </div>
              </li>
            ))
          }
        </ul>
        <h2>Extra</h2>
        <ul className="extra_proj-container">
          {
            data.wordpress.extra_projects.nodes.map(extra_proj => (
            <li key={extra_proj.title + "-" + extra_proj.date}>{extra_proj.title}</li>
            ))
          }
        </ul>
      </ProjectsContainer>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQuery {
    wordpress {
      projects {
        nodes {
          id
          title
          date
          slug
          featuredImage {
            node {
              link
              uri
            }
          }
        }
      }
      extra_projects {
        nodes {
          featuredImage {
            node {
              link
            }
          }
          id
          date
          slug
          title
        }
      }
    }
  }
`

export default Progetti;