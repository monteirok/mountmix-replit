import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enum for event types
export const eventTypeEnum = pgEnum('event_type', [
  'wedding',
  'corporate',
  'birthday',
  'holiday',
  'other'
]);

// Enum for package options
export const packageEnum = pgEnum('package', [
  'essential',
  'premium',
  'luxe',
  'custom'
]);

// Booking requests table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventDate: text("event_date").notNull(),
  eventTime: text("event_time").notNull(),
  eventType: eventTypeEnum("event_type").notNull(),
  packageType: packageEnum("package_type").notNull(),
  guestCount: integer("guest_count").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").default("pending"),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

// Define cocktails table
export const cocktails = pgTable("cocktails", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  baseSpirit: text("base_spirit").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false),
});

// Create insert schemas
export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  guestCount: z.number().min(10, "Minimum guest count is 10"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(10, "Please provide a valid phone number"),
});

export const insertContactSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  isRead: true,
}).extend({
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const insertCocktailSchema = createInsertSchema(cocktails).omit({
  id: true,
});

// Define types
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;

export type Cocktail = typeof cocktails.$inferSelect;
export type InsertCocktail = z.infer<typeof insertCocktailSchema>;

// User schema remains the same
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
// Email notifications table
export const emailNotifications = pgTable("email_notifications", {
  id: serial("id").primaryKey(),
  to: text("to").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
  type: text("type").notNull(), // 'booking' or 'contact'
  sourceId: integer("source_id").notNull(), // ID of the booking or contact message
});

export type User = typeof users.$inferSelect;
export type EmailNotification = typeof emailNotifications.$inferSelect;
export type InsertEmailNotification = typeof emailNotifications.$inferInsert;
