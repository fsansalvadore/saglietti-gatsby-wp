import styled from 'styled-components'

const StudioHeader = styled.header`
  width: 100%;
  height: 80vh;
  min-height: 600px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .header-text-center {
    h1 {
      font-size: 1rem;
    }

    p {
      font-size: 1.25rem;
      letter-spacing: -0.01rem;
      font-weight: bold;
      font-family: 'FFMarkWebProLight', sans-serif;
    }
  }

  @media (min-width: 768px) {
    .header-text-center {
      h1 {
        font-size: 1.5rem;
      }
  
      p {
        font-size: 2.75rem;
      }
    }
  }
`

export default StudioHeader