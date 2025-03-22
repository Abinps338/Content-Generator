import { pgTable, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("ai_output", {
  id: integer("id").primaryKey().notNull(),
  formData: text("form_data").notNull(),
  aiResponse: text("ai_response").notNull(),
  templateSlug: varchar("template_slug", { length: 255 }).notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), // Auto timestamps
});

export const UserSubscription = pgTable("user_subscription", {
  id: integer("id").primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
