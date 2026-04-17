import ArticlePageClient from "@/views/ArticlePage";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <ArticlePageClient slug={params.slug} />;
}
