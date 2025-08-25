import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const topics = formData.get("topics");
    const bannerBlob = formData.get("bannerBlob") as Blob;
    const iconBlob = formData.get("iconBlob") as Blob;
    const supabase = createSupabaseClient();
    //upload image to storage
    const bannerRes = await supabase.storage
      .from("community_banners")
      .upload(randomUUID(), bannerBlob!, {
        cacheControl: "3600",
        upsert: true,
        contentType: bannerBlob.type,
      });
    const iconRes = await supabase.storage
      .from("community_icons")
      .upload(randomUUID(), iconBlob!, {
        cacheControl: "3600",
        upsert: true,
        contentType: iconBlob.type,
      });

    if (iconRes.error) {
      throw iconRes.error;
    }
    if (bannerRes.error) {
      throw bannerRes.error;
    }
    const bannerUrl = supabase.storage
      .from("community_banners")
      .getPublicUrl(bannerRes.data.fullPath);
    const iconUrl = supabase.storage
      .from("community_icons")
      .getPublicUrl(iconRes.data.fullPath);

    const communityCreateRes = await supabase
      .from("communities")
      .insert({
        name,
        description,
        banner_url: bannerUrl,
        icon_url: iconUrl,
        topics,
      })
      .select();
    if (communityCreateRes.error) {
      throw communityCreateRes.error;
    }

    return new Response(JSON.stringify({ id: communityCreateRes.data[0].id }), {
      status: communityCreateRes.status,
    });
  } catch (e) {
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
}
