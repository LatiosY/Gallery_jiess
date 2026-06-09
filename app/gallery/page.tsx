import HorizontalGallery from "@/components/HorizontalGallery";
import { works } from "@/lib/works";

export const dynamic = "force-static";

export default function GalleryPage() {
  return <HorizontalGallery works={works} />;
}
