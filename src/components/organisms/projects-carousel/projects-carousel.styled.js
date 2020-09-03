import styled from 'styled-components'

const ProjectsCarouselStyled = styled.div`
  position: sticky;
  top: 0;
  width: 40%;
  height: 100vh;
  float: right;
  
  .carousel-top {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 80%;
    background-color: #000;
    display: flex;
    align-items: flex-end;
    padding: 5%;
    background-position: center;
    background-size: cover;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right:0;
      bottom: 0;
      width: 100%;
      height: 30%;
      z-index: 0;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
    }

    p {
      margin-bottom: 0.3rem;
      color: #fff;
    }

    .carousel-info {
      z-index: 10;
      width: 100%;
      display: flex;
      justify-content: space-between;
      
      .info-left {
        li {
          position: relative;
          display: inline-flex;
          list-style: none;
          padding: 0 10px;
          margin: 0;
          border-radius: 1px;
          align-items: center;
        }

        li:first-of-type {
          padding-left: 0;
        }

        li::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 0;
          border-bottom: 1px solid #fff;
          right: 0;
        }

        li:last-of-type::after {
          display: none;
        }
      }

      .info-right {
        display: flex;

        span:first-of-type {
          margin-right: 10px;
        }
      }
    }


    .carousel-img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 1;
      background-position: center;
      background-size: cover;
    }
  }

  .carousel-bottom {
    border-top: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20%;
    padding: 0 5%;
    text-decoration: none;
    font-size: 1.5rem;
    letter-spacing: -0.06rem;

    p, a {
      margin: 0;
    }
    
    p {
      overflow: hidden;
      padding: 4px 0;
      
      span {
        transition: transform 0.12s ease;
        display: block;
      }
    }
  }
`

export default ProjectsCarouselStyled