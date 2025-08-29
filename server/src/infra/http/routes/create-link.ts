import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { isLeft } from "@/shared/either";
import { createLink } from "@/app/functions/create-link";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        body: z.object({
          originalUrl: z.string().url("URL original inválida"),
          shortenedUrl: z
            .string()
            .regex(
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              "URL encurtada inválida. Use apenas letras minúsculas, números e hífens."
            ),
        }),
        response: {
          201: z.null(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { body } = request;

      const result = await createLink({
        originalUrl: body.originalUrl,
        shortenedUrl: body.shortenedUrl,
      });

      if (isLeft(result)) {
        return reply.status(409).send({
          message: "URL encurtada já existe no sistema.",
        });
      }

      return reply.status(201).send();
    }
  );
};
