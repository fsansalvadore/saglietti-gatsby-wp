import React from "react"
import CookieConsent from "react-cookie-consent"

const CookieComponent = () => {
  return (
    <CookieConsent
      className="cooky"
      location="bottom"
      style={{
        position: "fixed",
        background: "#fff",
        minHeight: "100px",
        height: "auto",
        bottom: "0",
        zIndex: "1000",
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px",
        borderTop: "1px solid #000",
        boxSizing: "border-box",
        color: "#000",
        lineHeight: "140%",
        fontWeight: "800",
      }}
      buttonStyle={{
        cursor: "pointer",
        backgroundColor: "#000",
        borderRadius: "0",
        padding: "6px 12px",
        color: "#fff",
        fontWeight: "800",
        fontSize: "16px",
        height: "auto",
        top: "0",
        position: "relative",
        float: "right",
        margin: 0,
        right: "none",
      }}
      onAccept={() => {}}
      cookieName="saglietti-consent"
      buttonText="Accetto"
    >
      Questo sito fa uso di cookie per migliorare l'esperienza di navigazione
      degli utenti e per raccogliere informazioni sull'utilizzo del sito stesso.
      Proseguendo nella navigazione si accetta l'uso dei cookie.
    </CookieConsent>
  )
}

export default CookieComponent
