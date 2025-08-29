import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/shared/either";
import { desc } from "drizzle-orm";

type GetLinksOutput = {
  links: {
    id: string;
    originalUrl: string;
    shortenedUrl: string;
    visitCount: number;
    createdAt: Date;
  }[];
};

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const links = await db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortenedUrl: schema.links.shortenedUrl,
      visitCount: schema.links.visitCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy((fields) => {
      return desc(fields.createdAt);
    });

  return makeRight({
    links,
  });
}
