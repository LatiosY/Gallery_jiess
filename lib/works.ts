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
    title: "无题",
    year: "2026",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/bloom-series-i.jpg",
  },
  {
    slug: "in-between",
    title: "无题",
    year: "2026",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/in-between.jpg",
  },
  {
    slug: "portrait-no-3",
    title: "无题",
    year: "2025",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/portrait-no-3.jpg",
  },
  {
    slug: "still-life-study",
    title: "无题",
    year: "2025",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/still-life-study.jpg",
  },
  {
    slug: "drift",
    title: "无题",
    year: "2025",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/drift.jpg",
  },
  {
    slug: "golden-hour",
    title: "无题",
    year: "2024",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/golden-hour.jpg",
  },
  {
    slug: "figure-in-motion",
    title: "无题",
    year: "2024",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/figure-in-motion.jpg",
  },
  {
    slug: "quiet-room",
    title: "无题",
    year: "2024",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/quiet-room.jpg",
  },
  {
    slug: "red-thread",
    title: "无题",
    year: "2023",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/red-thread.jpg",
  },
  {
    slug: "untitled-forest",
    title: "无题",
    year: "2023",
    medium: "Digital Illustration",
    description:
      "这里是画的描述。",
    cover: "/images/works/untitled-forest.jpg",
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
