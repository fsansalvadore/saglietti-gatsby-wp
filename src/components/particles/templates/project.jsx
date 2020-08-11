import React from "react"
import { Link } from "gatsby"

import Layout from "../../layout"
import ComponentParser from '../ComponentParser'

const ProjectPage = props => {
  const { content, blocks, title } = props.pageContext;

  return (
    <Layout>
      <h1>{title}</h1>
      <ComponentParser content={blocks}/>
      <Link to="/">Go to Home Page</Link>
    </Layout>
  )
}

export default ProjectPage