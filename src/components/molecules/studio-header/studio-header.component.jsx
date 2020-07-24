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
      font-size: 1.5rem;
    }

    p {
      font-size: 2.75rem;
      letter-spacing: -0.15rem;
      font-weight: 100;
      font-family: 'FFMarkWebProLight', sans-serif;
    }
  }
`

export default StudioHeader