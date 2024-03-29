import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = ["placeholders/1.svg"];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const gen = await ctx.db.insert("gens", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return gen;
  },
});

export const get = query({
  args: { id: v.id("gens") },
  handler: async (ctx, args) => {
    const gen = ctx.db.get(args.id);
    return gen;
  },
});
