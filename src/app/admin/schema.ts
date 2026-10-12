// Describes the editor form for each part of content.json. Add a field here when you add one to the content.
export type Field =
  | { key: string; label: string; type: "text" | "textarea" | "image" | "number" | "checkbox" | "color"; hint?: string }
  | { key: string; label: string; type: "select"; options: { value: string; label: string }[] }
  | { key: string; label: string; type: "paragraphs"; hint?: string }
  | { key: string; label: string; type: "images"; count: number; names: string[] }
  | { key: string; label: string; type: "object"; fields: Field[] }
  | { key: string; label: string; type: "list"; itemLabel: string; titleKey: string; fields: Field[]; newItem: Record<string, unknown> };

export type Section = { key: string; label: string; fields: Field[]; list?: Extract<Field, { type: "list" }> };

const kicker: Field = { key: "kicker", label: "Small label above heading", type: "text" };
const title: Field = { key: "title", label: "Heading", type: "text" };

export const sections: Section[] = [
  {
    key: "hero", label: "Top of home page",
    fields: [
      { key: "title", label: "Big headline", type: "text" },
      { key: "lede", label: "Intro sentence", type: "textarea" },
      { key: "images", label: "Photos", type: "images", count: 3, names: ["Large photo", "Small photo (left)", "Small photo (right)"] },
    ],
  },
  {
    key: "reviewBand", label: "Yellow review band",
    fields: [
      { key: "headline", label: "Bold text", type: "text" },
      { key: "text", label: "Message", type: "text" },
    ],
  },
  {
    key: "facts", label: "Facts row", fields: [],
    list: {
      key: "facts", label: "Facts", type: "list", itemLabel: "Fact", titleKey: "title", newItem: { title: "", text: "" },
      fields: [
        { key: "title", label: "Bold line", type: "text" },
        { key: "text", label: "Small line", type: "text" },
      ],
    },
  },
  {
    key: "reviews", label: "Reviews section",
    fields: [
      kicker, title,
      { key: "intro", label: "\"Worked with us?\" message", type: "textarea" },
      { key: "testimonial", label: "Featured quote", type: "object", fields: [
        { key: "quote", label: "Quote", type: "textarea" },
        { key: "author", label: "Client name", type: "text" },
      ] },
    ],
  },
  {
    key: "work", label: "Our work (projects)",
    fields: [
      kicker, title,
      { key: "projects", label: "Projects", type: "list", itemLabel: "Project", titleKey: "title",
        newItem: { title: "", detail: "", image: "", kind: "furniture" },
        fields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "detail", label: "Details", type: "text", hint: "e.g. White oak, Ballard" },
          { key: "kind", label: "Tab", type: "select", options: [
            { value: "furniture", label: "Custom furniture" },
            { value: "millwork", label: "Built-ins and millwork" },
          ] },
        ] },
    ],
  },
  {
    key: "pricing", label: "Pricing",
    fields: [
      kicker, title,
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "steps", label: "Steps", type: "list", itemLabel: "Step", titleKey: "title", newItem: { title: "", text: "" },
        fields: [
          { key: "title", label: "Step title", type: "text" },
          { key: "text", label: "Step text", type: "textarea" },
        ] },
      { key: "numbersTitle", label: "Side box heading", type: "text" },
      { key: "numbers", label: "Side box paragraphs", type: "paragraphs" },
    ],
  },
  {
    key: "about", label: "About Jonathan",
    fields: [
      kicker, title,
      { key: "photo", label: "Photo", type: "image" },
      { key: "paragraphs", label: "Paragraphs", type: "paragraphs" },
    ],
  },
  {
    key: "team", label: "Team",
    fields: [
      kicker, title,
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "members", label: "Team members", type: "list", itemLabel: "Person", titleKey: "name",
        newItem: { name: "", role: "", photo: "" },
        fields: [
          { key: "photo", label: "Headshot", type: "image", hint: "Square photos look best" },
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
        ] },
    ],
  },
  {
    key: "faq", label: "FAQ",
    fields: [
      kicker, title,
      { key: "items", label: "Questions", type: "list", itemLabel: "Question", titleKey: "q", newItem: { q: "", a: [""] },
        fields: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer paragraphs", type: "paragraphs" },
        ] },
    ],
  },
  {
    key: "start", label: "Contact section (home)",
    fields: [kicker, title, { key: "paragraphs", label: "Paragraphs", type: "paragraphs" }],
  },
  {
    key: "startPage", label: "Start a project page",
    fields: [title, { key: "paragraphs", label: "Paragraphs", type: "paragraphs" }],
  },
  {
    key: "woods", label: "Wood guide",
    fields: [
      kicker, title,
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "items", label: "Woods", type: "list", itemLabel: "Wood", titleKey: "name",
        newItem: { name: "", janka: 0, uses: "", local: false, image: "", tone: "#c9a77c" },
        fields: [
          { key: "image", label: "Photo", type: "image", hint: "Uploading your own photo removes the Wikimedia credit" },
          { key: "name", label: "Name", type: "text" },
          { key: "janka", label: "Janka hardness (lbf)", type: "number" },
          { key: "uses", label: "Good for", type: "text" },
          { key: "local", label: "PNW wood", type: "checkbox" },
          { key: "tone", label: "Placeholder color (if no photo)", type: "color" },
        ] },
    ],
  },
  {
    key: "contact", label: "Contact info",
    fields: [
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone (as shown)", type: "text" },
      { key: "phoneHref", label: "Phone link", type: "text", hint: "tel:+1 then digits, e.g. tel:+12067821377" },
      { key: "street", label: "Street", type: "text" },
      { key: "city", label: "City, state, ZIP", type: "text" },
    ],
  },
  {
    key: "social", label: "Social links",
    fields: [
      { key: "facebook", label: "Facebook URL", type: "text" },
      { key: "instagram", label: "Instagram URL", type: "text" },
    ],
  },
];
