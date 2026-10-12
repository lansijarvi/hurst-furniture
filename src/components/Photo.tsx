// Shows an uploaded photo, or the sage placeholder block until one is added in /admin.
export default function Photo({ src, className = "", alt = "" }: { src?: string; className?: string; alt?: string }) {
  if (!src) return <div className={`wood ${className}`} aria-hidden="true" />;
  return <img src={src} alt={alt} loading="lazy" className={`photo ${className}`} />;
}
