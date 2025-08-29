import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import z from "zod";
import { LinkNotExists } from "./errors/link-not-exists";

const decodeLinkInput = z.object({
  shortenedUrl: z.string(),
});

type DecodedLinkOutput = {
  link: {
    id: string;
    originalUrl: string;
  };
};

type DecodeLinkInput = z.input<typeof decodeLinkInput>;

export async function decodeLink(
  input: DecodeLinkInput
): Promise<Either<LinkNotExists, DecodedLinkOutput>> {
  const { shortenedUrl } = decodeLinkInput.parse(input);

  const [link] = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
    })
    .from(schema.links)
    .where(eq(schema.links.shortenedUrl, shortenedUrl));

  if (!link) return makeLeft(new LinkNotExists());

  return makeRight({
    link: {
      id: link.id,
      originalUrl: link.originalUrl,
    },
  });
}
