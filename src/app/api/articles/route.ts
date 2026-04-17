import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "published";
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const category = searchParams.get("category");

  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
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

  const insertData: any = {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt || null,
    content: body.content,
    category: body.category || "Uncategorized",
    tags: body.tags || [],
    cover_image: body.cover_image || null,
    status: body.status || "draft",
    read_time_minutes: body.read_time_minutes || null,
    author_id: user.id,
  };

  const { data, error } = await supabase
    .from("articles")
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
