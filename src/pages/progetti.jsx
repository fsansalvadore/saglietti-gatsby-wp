import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30vh auto 0 auto;
  padding: 0 25% 200px 8.3%;
  text-align: right;

  h1 {
    font-family: 'FFMarkWebProLight';
    font-weight: 200;
    font-size: 1rem;
    letter-spacing: -0.03rem;
    margin-bottom: 2rem;
  }
  ul, li {
    list-style-type: none;
    margin: 0;

    a {
      display: block;
      text-decoration: none;
      font-size: 3rem;
      letter-spacing: -0.05rem;
      margin: 0;
      line-height: 2rem;
      padding: 50px 0 60px 0;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    }
  }

  li {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #000;
      top: 0;
      left: 0;
    }

    &:last-of-type::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #000;
      bottom: 0;
      left: 0;
    }
  }
`

const Progetti = ({data}) => {
  console.log(data)
  return (
    <Layout>
      <Container>
        <h1>Progetti</h1>
        <ul>
          {
            data.wordpress.projects.nodes.map(proj => (
              <li>
                <div className="prog_list-item">
                  <Link key={proj.id} to={`/progetti/${proj.slug}`}>{proj.title}</Link>
                </div>
              </li>
            ))
          }
        </ul>
      </Container>
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
        }
      }
    }
  }
`

export default Progetti;