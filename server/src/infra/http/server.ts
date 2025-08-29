import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/create-link";
import { getLinksRoute } from "./routes/get-links";
import { deleteLinkRoute } from "./routes/delete-link";
import { decodeLinkRoute } from "./routes/decode-link";
import { incrementVisitCountLinkRoute } from "./routes/increment-visit-count-link";
import { exportLinksRoute } from "./routes/export-links";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  console.error(error);

  return reply.status(500).send({ message: error.message });
});

server.register(fastifyCors, { origin: "*" });

server.register(createLinkRoute);
server.register(getLinksRoute);
server.register(deleteLinkRoute);
server.register(decodeLinkRoute);
server.register(incrementVisitCountLinkRoute);
server.register(exportLinksRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
