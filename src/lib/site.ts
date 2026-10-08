// All editable site content lives here. Change text in this file, not in components.

export const contact = {
  email: "admin@hurstfurniture.com",
  phone: "(206) 782-1377",
  phoneHref: "tel:+12067821377",
  street: "943 NW 50th St",
  city: "Seattle, WA 98107",
};

const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

// Opens Google's "write a review" box for Hurst directly.
export const writeReviewUrl = placeId
  ? `https://search.google.com/local/writereview?placeid=${placeId}`
  : "https://www.google.com/maps/search/Hurst+Concepts+Seattle";

// Opens Google's reviews panel for Hurst.
export const allReviewsUrl = placeId
  ? `https://search.google.com/local/reviews?placeid=${placeId}`
  : "https://www.google.com/maps/search/Hurst+Concepts+Seattle";

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
