import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserRoute } from "./route.ts";
import { Env } from "./main.ts";

const api = new OpenAPIHono<Env>();

api.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  c.var.kv.set(["waiwai"], "waiwai");
  return c.json(
    {
      id,
      age: 20,
      name: "Ultra-man",
    },
    200, // You should specify the status code even if it is 200.
  );
});

export default api;
