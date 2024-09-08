import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserRoute } from "./route.ts";

const api = new OpenAPIHono();

api.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
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
