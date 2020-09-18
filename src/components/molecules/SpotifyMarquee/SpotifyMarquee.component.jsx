import React, {useState, useCallback} from 'react';
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

const MarqueeContainer = styled.button`
    padding: 10px 0;
    line-height: 140%;
    font-size: 1.45rem;
    font-weight: bold;
    border: none;
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
            allSpotifyRecentTrack {
                nodes {
                    track {
                        name
                        preview_url
                        artistString
                    }
                }
            }
        }
    `)
    const tracksList = data.allSpotifyRecentTrack.nodes.filter(node => node.track.preview_url !== null)
    console.log(tracksList)
    const time = new Date()
    const currentTrack = tracksList[Math.floor(((time.getHours() + 1) * tracksList.length) / 23) - 1];
    console.log(Math.floor(((time.getHours() + 5) * tracksList.length) / 23) - 1)
    console.log(currentTrack)
    
    let trackPreview = null
    let [icon, setIcon] = useState("🎵")
    let marqueeContent = `Stiamo ascoltando: ${currentTrack.track.name} — ${currentTrack.track.artistString}`
    
    if(typeof window !== `undefined`) {
        trackPreview = new Audio(currentTrack.track.preview_url)
        trackPreview.type = "audio/mp3"
        trackPreview.load()
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
        await setIcon("🎶")
    }, [])
    
    const pause = useCallback(async () => {
        await trackPreview.pause()
        trackPreview.currentTime = await 0
        await setIcon("🎵")
    }, [])

    return (
        <MarqueeContainer onMouseEnter={play} onMouseLeave={pause} onClick={pausePlay}>
            <marquee behavior="ALTERNATE" direction="left" dangerouslySetInnerHTML={{__html: marqueeContent}}></marquee>
        </MarqueeContainer>
    );
};

export default SpotifyMarquee;