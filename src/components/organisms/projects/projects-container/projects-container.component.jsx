import styled from 'styled-components'

const ProjectsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 250px auto 0 auto;
  padding: 0 25% 200px 8.3%;
  text-align: right;

  h1, h2 {
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

  .proj_content {
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
  }

  h2 {
    font-weight: 200;
    margin-top: 60px;
  }

  .extra_proj-container {
    li {
      font-size: 1rem;
      font-weight: 800;
      padding: 10px 0;
    }
  }
`

export default ProjectsContainer