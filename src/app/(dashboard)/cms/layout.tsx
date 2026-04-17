import CmsLayoutClient from "@/components/cms/CmsLayout";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <CmsLayoutClient>{children}</CmsLayoutClient>;
}
