import { directionsUrl, mapEmbedUrl } from "@/lib/site";

// Embedded Google Map of the Ballard shop, plus a directions button.
export default function ShopMap() {
  return (
    <div className="shop-map">
      <iframe
        src={mapEmbedUrl}
        title="Map of the Hurst shop at 943 NW 50th St, Seattle"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-accent">Get directions</a>
    </div>
  );
}
