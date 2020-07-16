import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = ({data}) => (
  <Layout>
    <h1>Hi people</h1>
    {console.log(data)}
    <hr/>
    <h4>Posts:</h4>
    <ul>
      {data.wordpress.posts.nodes.map(post => (
        <li>{post.date} - {post.slug}</li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/test/">Go to Test</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export const query = graphql`
  query MyQuery {
    wordpress {
      posts {
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

export default IndexPage
