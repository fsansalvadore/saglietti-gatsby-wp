// biome-ignore lint/correctness/noUnusedImports: React in scope for ESLint react/react-in-jsx-scope
import React, { useState } from "react"
import cn from "classnames"

const VIDEO_EXT_RE = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i

function isVideoUrl(url) {
  if (!url || typeof url !== "string") return false
  const path = url.split(/[?#]/)[0]
  return VIDEO_EXT_RE.test(path)
}

const baseLayerClass =
  "absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
const hoverLayerWrapClass =
  "pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100"
const hoverMediaFillClass = "h-full w-full object-cover"

const CoverHoverMediaInner = ({
  baseUrl,
  hoverUrl,
  fallbackUrl,
  alt = "",
  aspectClass = "aspect-video",
  className,
  hoverScale = false,
}) => {
  const [baseFailed, setBaseFailed] = useState(false)
  const [hoverFailed, setHoverFailed] = useState(false)

  const resolvedBase = baseFailed && fallbackUrl ? fallbackUrl : baseUrl

  const showHover =
    Boolean(hoverUrl) && !hoverFailed && hoverUrl !== resolvedBase

  const handleBaseError = () => {
    if (fallbackUrl && !baseFailed && baseUrl !== fallbackUrl) {
      setBaseFailed(true)
    }
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-gray-200",
        aspectClass,
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full",
          hoverScale &&
            "origin-center transform transition-transform duration-500 ease-out group-hover:scale-[1.04]",
        )}
      >
        {resolvedBase &&
          (isVideoUrl(resolvedBase) ? (
            <video
              className={baseLayerClass}
              src={resolvedBase}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt || undefined}
              onError={handleBaseError}
            />
          ) : (
            <img
              className={baseLayerClass}
              src={resolvedBase}
              alt={alt || ""}
              onError={handleBaseError}
            />
          ))}

        {showHover &&
          (isVideoUrl(hoverUrl) ? (
            <div className={hoverLayerWrapClass} aria-hidden={true}>
              <video
                className={hoverMediaFillClass}
                src={hoverUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setHoverFailed(true)}
              />
            </div>
          ) : (
            <img
              className={cn(hoverLayerWrapClass, hoverMediaFillClass)}
              src={hoverUrl}
              alt=""
              onError={() => setHoverFailed(true)}
            />
          ))}
      </div>
    </div>
  )
}

const CoverHoverMedia = props => {
  const resetKey = [props.baseUrl, props.hoverUrl, props.fallbackUrl].join("\0")
  return <CoverHoverMediaInner key={resetKey} {...props} />
}

export default CoverHoverMedia
