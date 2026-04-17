import OpportunityDetailPageClient from "@/views/OpportunityDetailPage";

export default function OpportunityPage({ params }: { params: { slug: string } }) {
  return <OpportunityDetailPageClient slug={params.slug} />;
}
