import styled from 'styled-components'

const ParagraphStyled = styled.div`
    p {
        font-size: 0.9rem;
        padding: 5rem 2rem;
        margin: 0 auto;
        max-width: 700px;
        line-height: 1.4rem;
        font-weight: 800;
        letter-spacing: -0.01rem;
    }

    @media (min-width: 900px) {
        padding: 5rem 4rem;
    }
`

export default ParagraphStyled