export type Work = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  description: string;
  cover: string;
};

export const works: Work[] = [
  {
    slug: "bloom-series-i",
    title: "Bloom Series I",
    year: "2026",
    medium: "Digital Illustration",
    description:
      "A meditation on the quiet unfolding of spring — petals rendered in loose, gestural marks.",
    cover: "/images/works/bloom-series-i.jpg",
  },
  {
    slug: "in-between",
    title: "In Between",
    year: "2026",
    medium: "Watercolor",
    description:
      "The liminal space between waking and dreaming, translated into soft washes of color.",
    cover: "/images/works/in-between.jpg",
  },
  {
    slug: "portrait-no-3",
    title: "Portrait No. 3",
    year: "2025",
    medium: "Oil on Canvas",
    description:
      "Part of an ongoing series exploring the quiet language of the human face.",
    cover: "/images/works/portrait-no-3.jpg",
  },
  {
    slug: "still-life-study",
    title: "Still Life Study",
    year: "2025",
    medium: "Gouache",
    description:
      "Everyday objects transformed through light and shadow into something sacred.",
    cover: "/images/works/still-life-study.jpg",
  },
  {
    slug: "drift",
    title: "Drift",
    year: "2025",
    medium: "Ink & Wash",
    description:
      "Inspired by fog-covered mountains — lines that dissolve before they arrive.",
    cover: "/images/works/drift.jpg",
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    year: "2024",
    medium: "Digital Illustration",
    description:
      "Chasing the seven minutes of light that make ordinary places extraordinary.",
    cover: "/images/works/golden-hour.jpg",
  },
  {
    slug: "figure-in-motion",
    title: "Figure in Motion",
    year: "2024",
    medium: "Charcoal",
    description:
      "A series of gesture drawings capturing the tension and grace of the moving body.",
    cover: "/images/works/figure-in-motion.jpg",
  },
  {
    slug: "quiet-room",
    title: "Quiet Room",
    year: "2024",
    medium: "Watercolor",
    description:
      "An interior bathed in afternoon light — the feeling of solitude without loneliness.",
    cover: "/images/works/quiet-room.jpg",
  },
  {
    slug: "red-thread",
    title: "Red Thread",
    year: "2023",
    medium: "Mixed Media",
    description:
      "Weaving personal mythology into abstract form — the invisible ties that bind.",
    cover: "/images/works/red-thread.jpg",
  },
  {
    slug: "untitled-forest",
    title: "Untitled (Forest)",
    year: "2023",
    medium: "Oil on Canvas",
    description:
      "Dense canopy, dappled silence. An attempt to paint the sound of a forest.",
    cover: "/images/works/untitled-forest.jpg",
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
