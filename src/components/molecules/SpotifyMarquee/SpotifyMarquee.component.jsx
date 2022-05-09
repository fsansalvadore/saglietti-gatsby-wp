// import React, { useCallback } from "react"
// import styled from "styled-components"
// import { useStaticQuery, graphql } from "gatsby"

// const MarqueeContainer = styled.button`
//   padding: 0;
//   line-height: 140%;
//   font-family: "ff-real-text-pro", sans-serif;
//   font-size: 1rem;
//   font-weight: 300;
//   border: none;
//   border-top: 1px solid #000;
//   background: transparent;
//   display: flex;
//   align-items: center;
//   overflow: visible;

//   marquee {
//     overflow: visible;
//     padding: 3rem 0;
//   }

//   span {
//     overflow: visible;
//     margin: 0.25rem 1rem;
//     padding: 0;
//     width: 6px;
//     height: 6px;
//     max-width: 6px;
//     max-height: 6px;
//     background-color: #000;
//     border-radius: 50%;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//   }

//   @media (min-width: 900px) {
//     font-size: 1.45rem;

//     span {
//       margin: 0.3rem 2rem;
//       width: 10px;
//       height: 10px;
//       max-width: 10px;
//       max-height: 10px;
//     }
//   }
// `

// const SpotifyMarquee = () => {
//   const data = useStaticQuery(graphql`
//     query SpotifyQuery {
//       allSpotifyTopTrack(
//         filter: { time_range: { eq: "short_term" } }
//         sort: { fields: order }
//       ) {
//         nodes {
//           name
//           preview_url
//           artistString
//         }
//       }
//     }
//   `)
//   const tracksList = data.allSpotifyTopTrack?.nodes?.filter(
//     node => node.preview_url !== null
//   )
//   const time = new Date()
//   const currentTrack =
//     tracksList[Math.floor((time.getHours() * tracksList.length) / 24)]
//   let trackPreview = null
//   let marqueeContent = ``

//   if (typeof window !== `undefined`) {
//     if (currentTrack) {
//       marqueeContent = `Stiamo ascoltando: ${currentTrack.name} — ${currentTrack.artistString}`
//       trackPreview = new Audio(currentTrack.preview_url)
//       trackPreview.type = "audio/mp3"
//       trackPreview.load()
//     } else {
//       marqueeContent = "Music coming soon"
//     }
//   }

//   for (let i = 0; i < 4; ++i) {
//     marqueeContent += ` <span></span> ${marqueeContent}`
//   }

//   const pausePlay = useCallback(async () => {
//     if (trackPreview.paused) {
//       play()
//     } else {
//       pause()
//     }
//   }, [])

//   const play = useCallback(async () => {
//     await trackPreview.load()
//     await trackPreview.play()
//   }, [])

//   const pause = useCallback(async () => {
//     await trackPreview.pause()
//     trackPreview.currentTime = await 0
//   }, [])

//   return (
//     <MarqueeContainer
//       onMouseEnter={play}
//       onMouseLeave={pause}
//       onClick={pausePlay}
//     >
//       <marquee
//         behavior="ALTERNATE"
//         direction="left"
//         dangerouslySetInnerHTML={{ __html: marqueeContent }}
//       ></marquee>
//     </MarqueeContainer>
//   )
// }

// export default SpotifyMarquee
