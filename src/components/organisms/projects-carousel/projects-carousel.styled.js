import styled from "styled-components"

const ProjectsCarouselStyled = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;

  .slider-container,
  .slick-list,
  .slick-track,
  .slick-slider {
    height: 100%;
  }
  .slick-dots {
    bottom: 25px;
    mix-blend-mode: difference;
  }
  .slick-dots li button:before {
    color: white;
  }

  .carousel-top {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 70%;
    background-color: #000;
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    background-position: center;
    background-size: cover;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0) 100%
      );
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
        .proj_ambiti {
          li {
            /* font-size: 0.9rem; */
            font-weight: 200;
            letter-spacing: 0;
            position: relative;
            display: inline-flex;
            height: 100%;
            list-style: none;
            padding-right: 12px;
            margin: 0;
            border-radius: 1px;
            align-items: center;
          }

          li::after {
            position: absolute;
            content: "/";
            font-size: 0.6rem;
            width: 1px;
            right: 8px;
          }

          li:last-of-type::after {
            display: none;
          }
        }
      }

      .info-right {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        a span:last-of-type {
          margin-left: 10px;
        }
      }
    }

    .carousel-img {
      position: absolute !important;
      width: 100% !important;
      height: 100% !important;
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
    border-top: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30%;
    padding: 0 1rem;
    text-decoration: none;
    font-size: 1.15rem;
    letter-spacing: 0;

    &:hover {
      cursor: pointer;
    }

    p,
    a {
      margin: 0;
    }

    p {
      overflow: hidden;
      padding: 4px 0;
      pointer-events: none;

      span {
        transition: transform 0.12s ease;
        display: block;
      }
    }
  }

  @media (min-width: 900px) {
    /* height: 100vh; */

    .carousel-top {
      height: 80%;
      padding: 2rem;
    }
    .carousel-bottom {
      font-size: 1.5rem;
      height: 20%;
      padding: 0 2rem;
    }
  }
`

export default ProjectsCarouselStyled
