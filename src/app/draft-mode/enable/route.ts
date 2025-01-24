/**
 * This file is sued to allow presentaion to set the app in Draft Mode, which will load Visual Editint and Query drafts content and preview the content is it will appear once everything is published
 * */

import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "../../../sanity/lib/client";
import { redirect } from "next/navigation";
import { draftMode } from "next/headers";

const token = process.env.SANITY_API_READ_TOKEN;

export async function GET(req: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client.withConfig({ token }),
    req.url
  );
  if (!isValid) {
    return new Response("Invalid secret", { status: 400 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}
