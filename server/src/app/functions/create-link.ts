import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import z from "zod";
import { LinkAlreadyExists } from "./errors/link-already-exists";

const createLinkInput = z.object({
  originalUrl: z.string().url("URL original inválida"),
  shortenedUrl: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "URL encurtada inválida. Use apenas letras minúsculas, números e hífens."
    ),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLink(
  input: CreateLinkInput
): Promise<Either<LinkAlreadyExists, null>> {
  const { originalUrl, shortenedUrl } = createLinkInput.parse(input);

  const link = await db
    .select({
      id: schema.links.id,
    })
    .from(schema.links)
    .where(eq(schema.links.shortenedUrl, shortenedUrl))
    .limit(1);

  if (link.length > 0) {
    return makeLeft(new LinkAlreadyExists());
  }

  await db.insert(schema.links).values({
    originalUrl,
    shortenedUrl,
  });

  return makeRight(null);
}
