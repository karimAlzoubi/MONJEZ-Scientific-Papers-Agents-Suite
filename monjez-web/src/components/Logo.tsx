interface LogoProps {
  className?: string
  /** When true, renders as decorative (empty alt) — pair with adjacent text label. */
  decorative?: boolean
}

/**
 * Monjez icon mark — book + checkmark + lightbulb on transparent bg.
 * Pair with <Wordmark /> for the full brand lockup.
 */
export default function Logo({ className = 'w-11 h-11', decorative = true }: LogoProps) {
  return (
    <img
      src="/brand/monjez-mark.png"
      srcSet="/brand/monjez-mark.png 1x, /brand/monjez-mark@2x.png 2x"
      alt={decorative ? '' : 'مُنجِز · Monjez'}
      aria-hidden={decorative || undefined}
      draggable={false}
      className={`${className} object-contain select-none drop-shadow-[0_4px_18px_rgba(45,212,191,0.22)]`}
    />
  )
}

/**
 * Monjez wordmark — Arabic "مُنجز" in white over English "Monjez" in mint.
 * Recolored from the original brand art so the typography is pixel-identical
 * to the source (same shapes, kerning, kasra placement).
 */
export function Wordmark({ className = 'h-10' }: { className?: string }) {
  return (
    <img
      src="/brand/monjez-wordmark-light.png"
      srcSet="/brand/monjez-wordmark-light.png 1x, /brand/monjez-wordmark-light@2x.png 2x"
      alt="مُنجِز · Monjez"
      draggable={false}
      className={`${className} w-auto object-contain select-none`}
    />
  )
}
