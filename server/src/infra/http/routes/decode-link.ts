import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { isLeft, unwrapEither } from "@/shared/either";
import { decodeLink } from "@/app/functions/decode-link";

export const decodeLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:shortenedUrl/decode",
    {
      schema: {
        params: z.object({
          shortenedUrl: z.string(),
        }),
        response: {
          200: z.object({
            link: z.object({
              id: z.string(),
              originalUrl: z.string(),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { params } = request;

      const result = await decodeLink({
        shortenedUrl: params.shortenedUrl,
      });

      if (isLeft(result)) {
        return reply.status(404).send({
          message: "URL não encontrada.",
        });
      }

      const { link } = unwrapEither(result);

      return reply.status(200).send({
        link,
      });
    }
  );
};
