import React from 'react'
import { Cookies, CookiesProvider, CookieBannerUniversal } from 'react-cookie-banner'

const CookieComponent = () => {
    const cookies = new Cookies(/* Your cookie header, on browsers defaults to document.cookie */)

    return (
        <CookiesProvider cookies={cookies}>
            <CookieBannerUniversal
                className="cooky"
                location='bottom'
                styles={{
                    banner: {
                        position: 'fixed',
                        backgroundColor: '#fff',
                        minHeight: '100px',
                        height: 'auto',
                        bottom: '0',
                        zIndex: '1000',
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '30px',
                        borderTop: '1px solid #000',
                        boxSizing: 'border-box'
                    },
                    message: {
                        color: '#000',
                        maxWidth: '900px',
                        paddingRight: '30px',
                        width: '80vw',
                        display: 'block',
                        textAlign: 'left',
                        lineHeight: '140%',
                        fontWeight: '800'
                    },
                    button: {
                        cursor: 'pointer',
                        backgroundColor: '#000',
                        borderRadius: '0',
                        padding: '6px 12px',
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: '16px',
                        height: 'auto',
                        top: '0',
                        position: 'relative',
                        float: 'right',
                        margin: 0,
                        right: 'none',
                    }
                }}        
                message="Questo sito fa uso di cookie per migliorare l’esperienza di navigazione degli utenti e per raccogliere informazioni sull’utilizzo del sito stesso. Proseguendo nella navigazione si accetta l’uso dei cookie."
                onAccept={() => {}}
                cookie="user-has-accepted-cookies"
                buttonMessage="Accetto"
            />
        </CookiesProvider>
    )
}

export default CookieComponent