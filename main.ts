import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import api from "./api.ts";
import { Env, getEnvObject } from "./env.ts";

const env = getEnvObject();
const kv = env.kvPath != undefined
  ? await Deno.openKv(env.kvPath)
  : await Deno.openKv();
const app = new OpenAPIHono<Env>();

// apply Middleware
app
  .use(
    "/doc",
    bearerAuth({
      token: env.bearer.token,
    }),
  )
  .use(
    "/api/*",
    bearerAuth({
      token: env.bearer.token,
    }),
  )
  .use(
    "/ui",
    basicAuth({
      username: env.basic.user,
      password: env.basic.passwd,
    }),
  )
  .use(async (c, next) => {
    c.set("kv", kv);
    await next();
  });

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
          request.headers['authorization'] = \`Bearer ${env.bearer.token}\`;
        }
        return request;
      }`,
    }),
  );

Deno.serve(app.fetch);
