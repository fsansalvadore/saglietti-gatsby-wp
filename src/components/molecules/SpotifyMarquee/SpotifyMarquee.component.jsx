import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

const MarqueeContainer = styled.button`
    padding: 30px 0;
    line-height: 140%;
    font-size: 1.45rem;
    font-weight: bold;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    background: transparent;

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
                  preview_url
                }
              }
        }
    `)
    let marqueeContent = `Stiamo ascoltando: ${data.spotifyRecentTrack.track.name} — ${data.spotifyRecentTrack.track.artists.map(art => ` ${art.name}`)}`
    const [isPlaying, setIsPlaying] = useState(true)
    const trackPreview = new Audio(data.spotifyRecentTrack.track.preview_url)
    trackPreview.type = "audio/mp3"

    for (let i = 0; i < 4; ++i) {
        marqueeContent += ` <span>🎵</span> ${marqueeContent}`
    }

    const pausePlay = () => {
        if(trackPreview.paused) {
            play()
        } else {
            pause()
        }
    }

    const play = () => {
        trackPreview.load()
        trackPreview.play()
    }

    const pause = () => {
        trackPreview.pause()
        trackPreview.currentTime = 0
    }

    return (
        <MarqueeContainer onClick={pausePlay}>
                <marquee behavior="ALTERNATE" direction="left" dangerouslySetInnerHTML={{__html: marqueeContent}}></marquee>
        </MarqueeContainer>
    );
};

export default SpotifyMarquee;