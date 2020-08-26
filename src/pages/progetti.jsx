import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

import '../components/particles/styles/projects.styles.scss'
import ProjectsContainer from '../components/organisms/projects/projects-container/projects-container.component'

const Progetti = ({data}) => (
    <Layout>
      <ProjectsContainer>
        <h1>Progetti</h1>
        <ul className="proj_content">
          {
            data.wordpress.projects &&
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
        {
          data.wordpress.extra_projects && (
            <div>
              <h2>Extra</h2>
              <ul className="extra_proj-container">
                {
                  data.wordpress.extra_projects.nodes.map(extra_proj => (
                  <li key={extra_proj.title + "-" + extra_proj.date}>{extra_proj.title}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </ProjectsContainer>
    </Layout>
  )

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