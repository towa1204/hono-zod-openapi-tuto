import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import api from "./api.ts";

const app = new OpenAPIHono();

// apply Middleware
app
  .use(
    "/doc",
    bearerAuth({
      token: "bearer-token",
    }),
  )
  .use(
    "/api/*",
    bearerAuth({
      token: "bearer-token",
    }),
  )
  .use(
    "/ui",
    basicAuth({
      username: "user",
      password: "password",
    }),
  );

app.route("/api", api);

// The OpenAPI documentation will be available at /doc
app
  .doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  })
  .get(
    "/ui",
    swaggerUI({
      url: "/doc",
      requestInterceptor: `
      request => {
        if (request.url === '/doc') {
          request.headers['authorization'] = \`Bearer bearer-token\`;
        }
        return request;
      }`,
    }),
  );

Deno.serve(app.fetch);
