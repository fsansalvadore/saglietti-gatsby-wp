import React from "react"
import { graphql, Link } from "gatsby"
import styled from 'styled-components';
import Layout from "../components/layout"
import { motion } from 'framer-motion';

import VerticalLine from '../components/atoms/vertical-line.component'

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 200vh;
`

const IndexPage = ({data}) => (
  <Layout>
    <HeaderContainer>
      <div></div>
      <VerticalLine initial={{x: "-60vw"}} animate={{ x: 0 }}
    transition={{ duration: 0.8 }} style={{left: "60%"}}/>
    </HeaderContainer>
    <h1>Saglietti</h1>
    <hr/>
    <h4>Posts:</h4>
    <ul>
      {data.wordpress.posts.nodes.map(post => (
        <li><Link key={post.id} to={`/progetti/${post.slug}`}>{post.date} - {post.slug}</Link></li>
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
