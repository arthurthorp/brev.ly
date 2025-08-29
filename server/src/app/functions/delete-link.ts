import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import z from "zod";
import { LinkNotExists } from "./errors/link-not-exists";

const deleteLinkInput = z.object({
  id: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotExists, true>> {
  const { id } = deleteLinkInput.parse(input);

  const links = await db
    .select({
      id: schema.links.id,
    })
    .from(schema.links)
    .where(eq(schema.links.id, id));

  if (links.length <= 0) return makeLeft(new LinkNotExists());

  await db.delete(schema.links).where(eq(schema.links.id, id));

  return makeRight(true);
}
