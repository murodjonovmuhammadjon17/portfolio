import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("Server is not configured", { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    );
    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new Response("Bad request", { status: 400 });
    }

    // Кейс влияет и на проект (кнопка «Read case study»), поэтому сбрасываем оба кэша.
    const tags =
      body._type === "caseStudy" ? ["caseStudy", "project"] : [body._type];
    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }
    return NextResponse.json({ revalidated: tags });
  } catch {
    return new Response("Error", { status: 500 });
  }
}
