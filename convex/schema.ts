import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    styleGuide: v.optional(v.string()),
    sketchesData: v.any(),
    viewportData: v.optional(v.any()),
    generatedDesignData: v.optional(v.any()),
    thumbnail: v.optional(v.string()),
    moodBoardImages: v.optional(v.array(v.string())),
    inspirationImages: v.optional(v.array(v.string())),
    lastModified: v.number(),
    isPublic: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
    projectNumber: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  project_counters: defineTable({
    userId: v.string(),
    nextProjectNumber: v.number(),
  }).index("by_userId", ["userId"]),
});
