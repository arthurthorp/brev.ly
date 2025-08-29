import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import z from "zod";
import { LinkNotExists } from "./errors/link-not-exists";

const incrementVisitCountLinkInput = z.object({
  id: z.string(),
});

type IncrementVisitCountLinkInput = z.input<
  typeof incrementVisitCountLinkInput
>;

export async function incrementVisitCountLink(
  input: IncrementVisitCountLinkInput
): Promise<Either<LinkNotExists, true>> {
  const { id } = incrementVisitCountLinkInput.parse(input);

  const [updated] = await db
    .update(schema.links)
    .set({
      visitCount: sql`${schema.links.visitCount} + 1`,
    })
    .where(eq(schema.links.id, id))
    .returning({
      id: schema.links.id,
    });

  if (!updated) return makeLeft(new LinkNotExists());

  return makeRight(true);
}
