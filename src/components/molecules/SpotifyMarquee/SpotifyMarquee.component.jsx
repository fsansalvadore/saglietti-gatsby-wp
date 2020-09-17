import React, {useState, useCallback} from 'react';
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import CTP from '../../../images/click-to-play.svg'
import CTS from '../../../images/click-to-stop.svg'

const MarqueeContainer = styled.button`
    padding: 10px 0;
    line-height: 140%;
    font-size: 1.45rem;
    font-weight: bold;
    border-top: 1px solid #000;
    background: transparent;
    display: flex;
    align-items: center;
    overflow: visible;

    marquee {
        overflow: visible;
    }

    span {
        overflow: visible;
        margin: 2rem;
        padding: 0;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
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
    let trackPreview = null
    let [icon, setIcon] = useState("🎵")

    if(typeof window !== `undefined`) {
        trackPreview = new Audio(data.spotifyRecentTrack.track.preview_url)
        trackPreview.type = "audio/mp3"
        console.log(data.spotifyRecentTrack.track.preview_url)
        console.log(trackPreview)
    }

    for (let i = 0; i < 4; ++i) {
        marqueeContent += ` <span>${icon}</span> ${marqueeContent}`
    }
    
    const pausePlay = useCallback(async () => {
        if(trackPreview.paused) {
            play()
            setIcon("🎶")
        } else {
            pause()
            setIcon("🎵")
        }
    }, [])

    const play = useCallback(async () => {
        await trackPreview.load()
        await trackPreview.play()
    }, [])

    const pause = useCallback(async () => {
        await trackPreview.pause()
        trackPreview.currentTime = await 0
    }, [])

    return (
        <MarqueeContainer onClick={pausePlay}>
            <marquee behavior="ALTERNATE" direction="left" dangerouslySetInnerHTML={{__html: marqueeContent}}></marquee>
        </MarqueeContainer>
    );
};

export default SpotifyMarquee;