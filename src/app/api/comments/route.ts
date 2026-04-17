import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("article_id");

  if (!articleId) {
    return NextResponse.json({ error: "article_id is required" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at, user_id, status")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch profiles for comment authors
  const userIds = [...new Set(data.map((c: any) => c.user_id).filter(Boolean))];
  let profileMap: Record<string, any> = {};

  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, username, display_name, avatar_url")
      .in("user_id", userIds);

    if (profiles) {
      profileMap = profiles.reduce((acc: any, p: any) => {
        acc[p.user_id] = {
          username: p.username,
          display_name: p.display_name,
          avatar_url: p.avatar_url,
        };
        return acc;
      }, {});
    }
  }

  const commentsWithProfiles = data.map((c: any) => ({
    ...c,
    profile: profileMap[c.user_id] || null,
  }));

  return NextResponse.json(commentsWithProfiles);
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.article_id || !body.content) {
    return NextResponse.json(
      { error: "article_id and content are required" },
      { status: 400 }
    );
  }

  const insertData: any = {
    article_id: body.article_id,
    user_id: user.id,
    content: body.content,
    status: body.status || "approved",
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
