import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { type Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { uuidv7 } from "uuidv7";

type GetLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<never, GetLinksOutput>> {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortenedUrl: schema.links.shortenedUrl,
      visitCount: schema.links.visitCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(50);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "original_url", header: "Original URL" },
      { key: "shortened_url", header: "Short URL" },
      { key: "visit_count", header: "Access Count" },
      { key: "created_at", header: "Created at" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], enconding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${uuidv7()}-links.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
