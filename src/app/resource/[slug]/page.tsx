import ResourceDetailPageClient from "@/views/ResourceDetailPage";

export default function ResourcePage({ params }: { params: { slug: string } }) {
  return <ResourceDetailPageClient slug={params.slug} />;
}
