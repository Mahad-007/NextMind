import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ChatClient from "@/components/chatbot/chat-client";

export default async function ChatbotPage() {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims) {
    redirect("/auth/login");
  }

  const userId = claimsData.claims.sub as string;
  const userEmail = (claimsData.claims.email as string) ?? "";

  // Ensure user row exists and get current credits
  let credits = 200;
  const { data: existing, error: selectError } = await supabase
    .from("users")
    .select("user_id, credits_count")
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) {
    // If table doesn't exist yet, surface a gentle fallback
    // The UI will still render; API will error until setup is complete
  }

  if (!existing) {
    const { data: inserted } = await supabase
      .from("users")
      .insert({ user_id: userId, user_email: userEmail, credits_count: 200 })
      .select("credits_count")
      .single();
    credits = inserted?.credits_count ?? 200;
  } else {
    credits = existing.credits_count ?? 200;
  }

  return <ChatClient initialCredits={credits} />;
}

