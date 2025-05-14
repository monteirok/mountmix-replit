import { 
  users, 
  type User, 
  type InsertUser,
  bookings,
  type Booking,
  type InsertBooking,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage,
  cocktails,
  type Cocktail,
  type InsertCocktail
} from "@shared/schema";

// Interface with CRUD methods for all entities
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Booking methods
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Contact messages methods
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  markMessageAsRead(id: number): Promise<ContactMessage | undefined>;

  // Cocktail methods
  getCocktail(id: number): Promise<Cocktail | undefined>;
  createCocktail(cocktail: InsertCocktail): Promise<Cocktail>;
  getAllCocktails(): Promise<Cocktail[]>;
  getFeaturedCocktails(): Promise<Cocktail[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookingsStore: Map<number, Booking>;
  private contactMessagesStore: Map<number, ContactMessage>;
  private cocktailsStore: Map<number, Cocktail>;
  private userCurrentId: number;
  private bookingCurrentId: number;
  private messageCurrentId: number;
  private cocktailCurrentId: number;

  constructor() {
    this.users = new Map();
    this.bookingsStore = new Map();
    this.contactMessagesStore = new Map();
    this.cocktailsStore = new Map();
    this.userCurrentId = 1;
    this.bookingCurrentId = 1;
    this.messageCurrentId = 1;
    this.cocktailCurrentId = 1;

    // Initialize with sample cocktails
    this.initializeCocktails();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Booking methods
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookingsStore.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const createdAt = new Date();
    const status = "pending";
    const booking: Booking = { ...insertBooking, id, createdAt, status };
    this.bookingsStore.set(id, booking);
    this.sendEmail({
        to: 'mountainmixologyca@gmail.com',
        subject: 'New Booking Inquiry',
        text: `New booking with the following details: ${JSON.stringify(booking)}`
    });
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookingsStore.values());
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookingsStore.get(id);
    if (!booking) return undefined;

    const updatedBooking = { ...booking, status };
    this.bookingsStore.set(id, updatedBooking);
    return updatedBooking;
  }

  // Contact message methods
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessagesStore.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const isRead = false;
    const message: ContactMessage = { ...insertMessage, id, createdAt, isRead };
    this.contactMessagesStore.set(id, message);
    this.sendEmail({
        to: 'mountainmixologyca@gmail.com',
        subject: 'New Contact Message',
        text: `New contact message with the following details: ${JSON.stringify(message)}`
    });
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesStore.values());
  }

  async markMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessagesStore.get(id);
    if (!message) return undefined;

    const updatedMessage = { ...message, isRead: true };
    this.contactMessagesStore.set(id, updatedMessage);
    return updatedMessage;
  }

  // Cocktail methods
  async getCocktail(id: number): Promise<Cocktail | undefined> {
    return this.cocktailsStore.get(id);
  }

  async createCocktail(insertCocktail: InsertCocktail): Promise<Cocktail> {
    const id = this.cocktailCurrentId++;
    const cocktail: Cocktail = { ...insertCocktail, id };
    this.cocktailsStore.set(id, cocktail);
    return cocktail;
  }

  async getAllCocktails(): Promise<Cocktail[]> {
    return Array.from(this.cocktailsStore.values());
  }

  async getFeaturedCocktails(): Promise<Cocktail[]> {
    return Array.from(this.cocktailsStore.values()).filter(
      (cocktail) => cocktail.featured
    );
  }

  private async sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    // For now this is just logging the email content
    // You'll need to set up a proper email service
    console.log(`Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text}`);
    return true;
  }

  // Initialize with sample cocktails
  private initializeCocktails() {
    const sampleCocktails: InsertCocktail[] = [
      {
        name: "Alpine Botanist",
        description: "Alberta premium gin, elderflower liqueur, fresh foraged spruce tips, mountain spring water, and a hint of local wildflower honey, served over crystal-clear ice with a pine garnish.",
        baseSpirit: "Alberta Gin",
        imageUrl: "https://pixabay.com/get/g9c4a7ec9bd557c3eaac00eefd972beb8924c22aa69b2a4a4e160d88b066a1d1d83093231c082857f70589a6b92a6ee94f9df8094363d47b4b560812c51358424_1280.jpg",
        featured: true
      },
      {
        name: "Rocky Mountain Old Fashioned",
        description: "Canadian rye whisky, Alberta wildflower honey, local birch bitters, and applewood smoke, garnished with a cedar-smoked orange peel and a whisky-soaked saskatoon berry.",
        baseSpirit: "Canadian Whisky",
        imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true
      },
      {
        name: "Bow Valley Sunset",
        description: "Premium white rum, locally-foraged berry cordial, fresh mountain berry juice, and lime, topped with a spruce tip and edible wildflowers from the Bow Valley region.",
        baseSpirit: "Premium Rum",
        imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true
      },
      {
        name: "Canmore Frost Martini",
        description: "Locally-distilled vodka, dry vermouth, and a touch of glacier water with pine essence, served straight up in a chilled martini glass rimmed with local mountain salt.",
        baseSpirit: "Alberta Vodka",
        imageUrl: "https://pixabay.com/get/gfd907d660cc37c063cea7f0952bc79a647077238e1bf6a1025f13ddfef654ee5e1bd28975db21dc21a1ca87e4777676ef96bf014922e38a299ad244fbec1acac_1280.jpg",
        featured: true
      },
      {
        name: "Mountain Fire",
        description: "Premium tequila, fresh lime, house-made fireweed syrup, local ginger, and a dash of alpine pepper tincture, served over ice with a black salt rim and dehydrated lime.",
        baseSpirit: "Premium Tequila",
        imageUrl: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true
      },
      {
        name: "Banff Bubbles",
        description: "Canadian sparkling wine, locally-foraged berry liqueur, fresh saskatoon berry purée, and a touch of mountain honey, garnished with an edible flower from the Rockies.",
        baseSpirit: "Canadian Sparkling Wine",
        imageUrl: "https://images.unsplash.com/photo-1560963689-b5682b6440f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true
      }
    ];

    sampleCocktails.forEach((cocktail) => {
      this.createCocktail(cocktail);
    });
  }
}

export const storage = new MemStorage();