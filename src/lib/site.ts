// All editable site content lives here. Change text in this file, not in components.

export const contact = {
  email: "admin@hurstfurniture.com",
  phone: "(206) 782-1377",
  phoneHref: "tel:+12067821377",
  street: "943 NW 50th St",
  city: "Seattle, WA 98107",
};

// Place ID of the "Hurst Custom Furniture LLC" Google Business listing (the one with the reviews),
// not the bare 943 NW 50th St address listing, which has posting turned off.
const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

// Until the Place ID is set, both links fall back to a Google search that shows Hurst's business panel.
const googleSearchUrl = "https://www.google.com/search?q=Hurst+Custom+Furniture+LLC+Seattle";

// Opens Google's "write a review" box for Hurst directly.
export const writeReviewUrl = placeId
  ? `https://search.google.com/local/writereview?placeid=${placeId}`
  : googleSearchUrl;

// Opens Google's reviews panel for Hurst.
export const allReviewsUrl = placeId
  ? `https://search.google.com/local/reviews?placeid=${placeId}`
  : googleSearchUrl;

// Map and directions for the Ballard shop (keyless Google Maps embed).
const mapsQuery = encodeURIComponent("Hurst Custom Furniture LLC, 943 NW 50th St, Seattle, WA 98107");
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const directionsUrl = placeId
  ? `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}&destination_place_id=${placeId}`
  : `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export const social = {
  facebook: "https://www.facebook.com/hurstcustomfurniture",
  instagram: "https://www.instagram.com/hurst_furniture/",
};

export const featuredTestimonial = {
  quote:
    "I highly recommend the company and would not hesitate to use them again. They are capable of very high quality work for almost any type of furniture or other wood product.",
  author: "[Client name]",
};

export const team = [
  { name: "Jonathan Hurst", role: "Founder", photo: "" },
  { name: 'James "Mac" McIntyre', role: "Project Manager, Designer", photo: "" },
  { name: "Will Haberman", role: "Designer, Builder", photo: "" },
  { name: "Sharon Korn", role: "Office Manager", photo: "" },
  { name: "Austin Wells", role: "Lead Builder", photo: "" },
  { name: "Tommy Teav", role: "Builder", photo: "" },
  { name: "Eric Baumgartner", role: "Builder", photo: "" },
  { name: "Dani Hopple", role: "Designer, Builder", photo: "" },
  { name: "Aaron Lorenz", role: "Designer, Builder", photo: "" },
  { name: "Will Lachance", role: "Builder", photo: "" },
  { name: "Brent Driscoll", role: "Builder", photo: "" },
  { name: "Adam Price", role: "Builder", photo: "" },
  { name: "Peter Haines", role: "Builder", photo: "" },
  { name: "Sean Westlake", role: "Director of Marketing", photo: "" },
];

// Add real projects here. Put images in /public/work/ and reference them as "/work/filename.jpg".
export type Project = { title: string; detail: string; image: string; kind: "furniture" | "millwork" };
export const projects: Project[] = [
  { title: "[Project name]", detail: "[Wood species, neighborhood]", image: "", kind: "furniture" },
  { title: "[Project name]", detail: "[Wood species, neighborhood]", image: "", kind: "furniture" },
  { title: "[Project name]", detail: "[Wood species, neighborhood]", image: "", kind: "furniture" },
  { title: "[Project name]", detail: "[Wood species, neighborhood]", image: "", kind: "furniture" },
  { title: "[Built-in project]", detail: "[Room, neighborhood]", image: "", kind: "millwork" },
  { title: "[Millwork project]", detail: "[Room, neighborhood]", image: "", kind: "millwork" },
  { title: "[Built-in project]", detail: "[Room, neighborhood]", image: "", kind: "millwork" },
  { title: "[Millwork project]", detail: "[Room, neighborhood]", image: "", kind: "millwork" },
];

export const faqs = [
  {
    q: "What is your pricing structure for custom work?",
    a: [
      'At Hurst Concepts, we function on a "Cost Plus" model, and pricing is based on our best estimate of what will be required to complete any job. We try to be as conservative as possible, and will charge the actual cost for the work completed. For transparency, we have a 20% markup on subcontractors and other reimbursable expenses such as materials. We then charge our labor rates for hours worked to complete customer projects.',
    ],
  },
  {
    q: "What if I want an exact number up front for my project?",
    a: [
      "The short answer is no, we can't do that. We want to be as fair to our customers as possible! We found that full quotes for work require us to hedge against the gamble of predicting the future by adding a margin of 10 to 15 percent!",
      "We prefer to charge our clients only for the accurate amount of labor and materials required for the job. Since so much of the work we do is on-the-fly, fully custom, it tends to lead to more unpredictability. Over the years, we have found that this is the most fair model for us and for our clients.",
    ],
  },
  {
    q: "How fast can I get an estimate for my project?",
    a: [
      "It depends on your project! No matter how complex it is though, know that within one day of an inquiry we are evaluating the cost by reaching out to suppliers and calculating our expected labor hours to completion.",
    ],
  },
  {
    q: "If I want to build something that matches my existing furniture or cabinetry, is that something that you are able to do?",
    a: ["We are happy to do that! With a sample, we can match any finish or cabinet door trim detail."],
  },
  {
    q: "Do I have to have a fully fledged design before approaching you with a new project idea?",
    a: [
      "Not at all! It is true that if you have more specific details about your project, we are able to be more efficient on delivering an estimate. But our team is able to work with you to collect those details and bring what you are imagining to life.",
    ],
  },
  {
    q: "What area are you located in?",
    a: ["We are located in Seattle's Ballard neighborhood, at 943 NW 50th St."],
  },
  {
    q: "Do you have any employment opportunities?",
    a: [
      "We are always looking to build relationships with skilled or curious people that are interested in what we do. Reach out with a resume! Regardless of availability, we'd love to show you the shop and hear about your experience.",
    ],
  },
];

// Wood guide (/woods). Janka side hardness in pounds-force (lbf), commonly published values.
// Photos in /public/woods/ are free-licensed from Wikimedia Commons; `credit` is required for CC BY / BY-SA.
// Swap in shop photos any time (then drop the credit). `tone` tints the placeholder if there's no image.
export type Credit = { author: string; license: string; licenseUrl: string; source: string };
export type Wood = { name: string; janka: number; uses: string; local?: boolean; image: string; tone: string; credit?: Credit };
export const woods: Wood[] = [
  { name: "Hickory", janka: 1820, uses: "Chairs, tool handles, hard-wearing floors", image: "/woods/hickory.jpg", tone: "#c9a77c",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Hickory_Holz.JPG" } },
  { name: "Hard maple", janka: 1450, uses: "Tabletops, cutting boards, drawers", image: "/woods/hard-maple.jpg", tone: "#e6d3b0",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Ahorn_Holz.JPG" } },
  { name: "Sapele", janka: 1410, uses: "Furniture, doors, ribbon-figured panels", image: "/woods/sapele.jpg", tone: "#8a4a2e",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Sapelli-Mahagoni_Holz.JPG" } },
  { name: "White oak", janka: 1360, uses: "Tables, built-ins, cabinetry, floors", image: "/woods/white-oak.jpg", tone: "#c8a77a",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Wei%C3%9Feiche_Holz.JPG" } },
  { name: "Ash", janka: 1320, uses: "Chairs, tables, bent parts", image: "/woods/ash.jpg", tone: "#dcc59c",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Esche_gemeine_Holz.JPG" } },
  { name: "Red oak", janka: 1290, uses: "Cabinetry, trim, furniture", image: "/woods/red-oak.jpg", tone: "#c99a72",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Roteiche_Holz.JPG" } },
  { name: "Teak", janka: 1070, uses: "Outdoor furniture, bathrooms, boats", image: "/woods/teak.jpg", tone: "#a87a46",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Teak_Holz.JPG" } },
  { name: "Black walnut", janka: 1010, uses: "Dining tables, casework, statement pieces", image: "/woods/black-walnut.jpg", tone: "#5a3e2b",
    credit: { author: "Brya", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:BlWal03.jpg" } },
  { name: "Cherry", janka: 950, uses: "Fine furniture, cabinetry; darkens with age", image: "/woods/cherry.jpg", tone: "#a8603e",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Amerikanischer_Kirschbaum_Holz.JPG" } },
  { name: "Bigleaf maple", janka: 850, local: true, uses: "Figured tops, accents, furniture", image: "/woods/bigleaf-maple.jpg", tone: "#dcc4a0",
    credit: { author: "Stephen Ondich", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Quilt_Figured_Big_Leaf_Maple_Lumber_boards.jpg" } },
  { name: "Mahogany", janka: 800, uses: "Fine furniture, carving, doors", image: "/woods/mahogany.jpg", tone: "#8c4a32",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Swietenia_macrophylla_wood.jpg" } },
  { name: "Douglas fir", janka: 620, local: true, uses: "Built-ins, trim, beams, doors", image: "/woods/douglas-fir.jpg", tone: "#d4a26f",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Douglasie_Holz.JPG" } },
  { name: "Red alder", janka: 590, local: true, uses: "Cabinetry, painted or stained furniture", image: "/woods/red-alder.jpg", tone: "#c98f62",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Erle_Holz.JPG" } },
  { name: "Eastern white pine", janka: 380, uses: "Painted furniture, shelving, trim", image: "/woods/white-pine.jpg", tone: "#ead7b0",
    credit: { author: "Philipp Zinger", license: "CC BY-SA 3.0", licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Weymouth-Kiefer_Holz.JPG" } },
  { name: "Western red cedar", janka: 350, local: true, uses: "Outdoor projects, closets, siding", image: "/woods/red-cedar.jpg", tone: "#b06a45",
    credit: { author: "Brya", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:W_Redced.jpg" } },
];
