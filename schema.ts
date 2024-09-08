import { z } from "@hono/zod-openapi";

export const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
});

export const UserSchema = z.object({
  id: z.string().openapi({
    example: "123",
  }),
  name: z.string().openapi({
    example: "John Doe",
  }),
  age: z.number().openapi({
    example: 42,
  }),
})
  .openapi("User");

export const BookSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  author: z.string().min(1),
  publishedYear: z.number().int(),
});
