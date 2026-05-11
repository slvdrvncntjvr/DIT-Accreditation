export type ExternalLink = {
  label: string;
  href: string;
};

export type MediaEmbed = {
  title: string;
  url: string;
};

export const externalLinks: ExternalLink[] = [
  { label: "PUP Website", href: "https://www.pup.edu.ph/" },
  { label: "PUP SINTA", href: "https://www.pup.edu.ph/students/" },
  { label: "Compliance Report Hub", href: "/compliance" },
  { label: "Narrative Report", href: "/narrative-report" },
];

export const videoEmbeds: MediaEmbed[] = [
  {
    title: "Program Overview Video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Student Project Highlights",
    url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
];

export const updateGuide = [
  "Open src/data/embeds.ts.",
  "Update externalLinks for quick links and document URLs.",
  "Update videoEmbeds for media iframes using embeddable URLs.",
  "Run npm run build to validate links render properly.",
];
