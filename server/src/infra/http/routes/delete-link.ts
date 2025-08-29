import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { isLeft } from "@/shared/either";
import { deleteLink } from "@/app/functions/delete-link";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
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

      const result = await deleteLink({
        id: params.id,
      });

      if (isLeft(result)) {
        return reply.status(404).send({
          message: "Link não encontrado",
        });
      }

      return reply.status(204).send();
    }
  );
};
