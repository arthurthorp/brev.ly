import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { isLeft } from "@/shared/either";
import { incrementVisitCountLink } from "@/app/functions/increment-visit-count-link";

export const incrementVisitCountLinkRoute: FastifyPluginAsyncZod = async (
  server
) => {
  server.patch(
    "/links/:id/visit",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { params } = request;

      const result = await incrementVisitCountLink({
        id: params.id,
      });

      if (isLeft(result)) {
        return reply.status(404).send({
          message: "URL não encontrada.",
        });
      }

      return reply.status(204).send();
    }
  );
};
