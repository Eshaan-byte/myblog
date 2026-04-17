import ProfilePageClient from "@/views/ProfilePage";

export default function ProfilePage({ params }: { params: { username: string } }) {
  return <ProfilePageClient username={params.username} />;
}
