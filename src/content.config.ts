import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const devices = defineCollection({
  loader: glob({ base: "./src/content/devices", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    primary: z.boolean().default(false),
    image: z.string().optional(),
    status: z.enum(["active", "retired", "broken"]),
    acquired: z.string(),
    nickname: z.string().optional(),
    brand: z.string(),
    model: z.string(),
    specs: z.object().catchall(z.string()).optional(),
  }),
});

export const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),

  schema: z.object({
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    title: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    year: z
      .string()
      .optional()
      .describe(
        "Optional override year grouping (otherwise derived from date)",
      ),
  }),
});

export const collections = {
  devices,
  blog,
};
