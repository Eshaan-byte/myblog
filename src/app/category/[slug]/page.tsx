import CategoryPageClient from "@/views/CategoryPage";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryPageClient slug={params.slug} />;
}
