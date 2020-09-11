import React from 'react';
import styled from 'styled-components'
import { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby'

const MarqueeContainer = styled.div`
    padding: 30px 0;
    line-height: 140%;
    font-size: 1.45rem;
    font-weight: bold;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;

    span {
        padding: 0 2rem;
    }
`

const SpotifyMarquee = () => {
    const data = useStaticQuery(graphql`
        query SpotifyQuery {
            spotifyRecentTrack {
                track {
                  artists {
                    name
                  }
                  name
                }
              }
        }
    `)

    let marqueeContent = `Stiamo ascoltando: ${data.spotifyRecentTrack.track.name} — ${data.spotifyRecentTrack.track.artists.map(art => ` ${art.name}`)}`

    for (let i = 0; i < 4; ++i) {
        marqueeContent += ` <span>🎵</span> ${marqueeContent}`
    }

    return (
        <MarqueeContainer >
            <marquee behavior="ALTERNATE" direction="left" dangerouslySetInnerHTML={{__html: marqueeContent}}></marquee>
        </MarqueeContainer>
    );
};

export default SpotifyMarquee;