import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import MenuItems from '../components/molecules/menu-items/menu-items'

const IndexPage = ({data}) => (
  <Layout>
    <h1>Saglietti</h1>
    <MenuItems />
    {console.log(data)}
    <hr/>
    <h4>Posts:</h4>
    <ul>
      {data.wordpress.posts.nodes.map(post => (
        <li>{post.date} - {post.slug}</li>
      ))}
    </ul>
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
