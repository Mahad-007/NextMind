import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  try {
    const { message, history }: { message: string; history?: ChatMessage[] } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
    if (claimsError || !claimsData?.claims) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = claimsData.claims.sub as string;
    const userEmail = (claimsData.claims.email as string) ?? "";

    // Ensure row exists
    const { data: existing, error: selectError } = await supabase
      .from("users")
      .select("user_id, credits_count")
      .eq("user_id", userId)
      .maybeSingle();
    if (selectError) {
      return NextResponse.json(
        { error: "Users table not found or not accessible. Please run setup." },
        { status: 500 },
      );
    }

    let currentCredits = existing?.credits_count as number | undefined;
    if (!existing) {
      const { data: inserted, error: insertError } = await supabase
        .from("users")
        .insert({ user_id: userId, user_email: userEmail, credits_count: 200 })
        .select("credits_count")
        .single();
      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
      currentCredits = inserted.credits_count;
    }

    if (!currentCredits || currentCredits <= 0) {
      return NextResponse.json({ error: "No credits left", credits: 0 }, { status: 402 });
    }

    const newCredits = currentCredits - 1;
    const { data: updated, error: updateError } = await supabase
      .from("users")
      .update({ credits_count: newCredits })
      .eq("user_id", userId)
      .select("credits_count")
      .single();
    if (updateError) {
      return NextResponse.json({ error: updateError.message, credits: newCredits }, { status: 500 });
    }

    // Call Groq Chat Completions API
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set on the server", credits: updated.credits_count },
        { status: 500 },
      );
    }

    const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
    const groqMessages = [
      { role: "system", content: "You are a helpful, concise assistant." },
      ...((history || []).map((m) => ({ role: m.role, content: m.content }))),
      { role: "user", content: message },
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model,
        messages: groqMessages,
        temperature: 0.6,
        max_tokens: 512,
      }),
    });

    const groqData = await groqRes.json();
    if (!groqRes.ok) {
      const apiError = typeof groqData?.error === "string" ? groqData.error : groqData?.error?.message;
      return NextResponse.json(
        { error: apiError || "Groq API error", credits: updated.credits_count },
        { status: 502 },
      );
    }

    const reply: string = groqData?.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply, credits: updated.credits_count }, { status: 200 });
  } catch (e: unknown) {
    const err = e as Error;
    return NextResponse.json({ error: err.message ?? "Unknown error" }, { status: 500 });
  }
}

