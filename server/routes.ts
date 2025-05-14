import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for getting all cocktails
  app.get("/api/cocktails", async (_req, res) => {
    try {
      const cocktails = await storage.getAllCocktails();
      res.json(cocktails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cocktails" });
    }
  });

  // API route for getting featured cocktails
  app.get("/api/cocktails/featured", async (_req, res) => {
    try {
      const cocktails = await storage.getFeaturedCocktails();
      res.json(cocktails);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured cocktails" });
    }
  });

  // API route for getting a specific cocktail
  app.get("/api/cocktails/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cocktail ID" });
      }

      const cocktail = await storage.getCocktail(id);
      if (!cocktail) {
        return res.status(404).json({ message: "Cocktail not found" });
      }

      res.json(cocktail);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cocktail" });
    }
  });

  // API route for submitting a booking request
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      
      // Send email notification
      await storage.sendEmail({
        to: "mountainmixologyca@gmail.com",
        subject: `New Booking Request - ${bookingData.eventType}`,
        text: `
New booking request received:

Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Event Date: ${bookingData.eventDate}
Event Time: ${bookingData.eventTime}
Event Type: ${bookingData.eventType}
Package: ${bookingData.packageType}
Guest Count: ${bookingData.guestCount}
Message: ${bookingData.message}
        `
      });

      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.format() 
        });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // API route for submitting a contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);

      // Send email notification
      await storage.sendEmail({
        to: "mountainmixologyca@gmail.com",
        subject: `New Contact Message - ${messageData.subject}`,
        text: `
New contact message received:

Name: ${messageData.name}
Email: ${messageData.email}
Subject: ${messageData.subject}
Message: ${messageData.message}
        `
      });

      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.format() 
        });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
