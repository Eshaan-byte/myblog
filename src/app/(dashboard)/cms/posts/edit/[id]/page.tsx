import CmsPostEditor from "@/views/cms/CmsPostEditor";

export default function CmsEditPostPage({ params }: { params: { id: string } }) {
  return <CmsPostEditor editId={params.id} />;
}
