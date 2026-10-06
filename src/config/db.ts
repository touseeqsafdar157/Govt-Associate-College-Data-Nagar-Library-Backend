import fs from 'fs';
import path from 'path';
import {
  Book,
  Member,
  BorrowTransaction,
  ReadingRoomSeat,
  DigitalResource,
  LibraryAnnouncement,
  BookSuggestion,
  Almari,
  Feedback,
  UserAccount
} from '../types';
import {
  INITIAL_BOOKS,
  INITIAL_ALMARIS,
  INITIAL_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_DIGITAL_RESOURCES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SUGGESTIONS,
  INITIAL_SEATS,
  INITIAL_USERS
} from '../data/seedData';

export interface DatabaseSchema {
  books: Book[];
  almaris: Almari[];
  members: Member[];
  transactions: BorrowTransaction[];
  seats: ReadingRoomSeat[];
  resources: DigitalResource[];
  announcements: LibraryAnnouncement[];
  suggestions: BookSuggestion[];
  feedback: Feedback[];
  users: UserAccount[];
}

class Database {
  private dataFilePath: string;
  private memoryData: DatabaseSchema;

  constructor() {
    const dataDir = path.resolve(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.dataFilePath = path.join(dataDir, 'database.json');
    this.memoryData = this.loadOrCreate();
  }

  private loadOrCreate(): DatabaseSchema {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const raw = fs.readFileSync(this.dataFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all collections exist
        return {
          books: parsed.books || INITIAL_BOOKS,
          almaris: parsed.almaris || INITIAL_ALMARIS,
          members: parsed.members || INITIAL_MEMBERS,
          transactions: parsed.transactions || INITIAL_TRANSACTIONS,
          seats: parsed.seats || INITIAL_SEATS,
          resources: parsed.resources || INITIAL_DIGITAL_RESOURCES,
          announcements: parsed.announcements || INITIAL_ANNOUNCEMENTS,
          suggestions: parsed.suggestions || INITIAL_SUGGESTIONS,
          feedback: parsed.feedback || [],
          users: parsed.users || INITIAL_USERS
        };
      }
    } catch (err) {
      console.error('Error reading database file, initializing from seed data:', err);
    }

    const initialData: DatabaseSchema = {
      books: INITIAL_BOOKS,
      almaris: INITIAL_ALMARIS,
      members: INITIAL_MEMBERS,
      transactions: INITIAL_TRANSACTIONS,
      seats: INITIAL_SEATS,
      resources: INITIAL_DIGITAL_RESOURCES,
      announcements: INITIAL_ANNOUNCEMENTS,
      suggestions: INITIAL_SUGGESTIONS,
      feedback: [],
      users: INITIAL_USERS
    };

    this.saveToFile(initialData);
    return initialData;
  }

  private saveToFile(data: DatabaseSchema): void {
    try {
      const tempPath = `${this.dataFilePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.dataFilePath);
    } catch (err) {
      console.error('Failed to write database to disk:', err);
    }
  }

  public get<K extends keyof DatabaseSchema>(collection: K): DatabaseSchema[K] {
    return this.memoryData[collection];
  }

  public set<K extends keyof DatabaseSchema>(collection: K, value: DatabaseSchema[K]): void {
    this.memoryData[collection] = value;
    this.saveToFile(this.memoryData);
  }

  public update<K extends keyof DatabaseSchema>(
    collection: K,
    updater: (current: DatabaseSchema[K]) => DatabaseSchema[K]
  ): DatabaseSchema[K] {
    const updated = updater(this.memoryData[collection]);
    this.memoryData[collection] = updated;
    this.saveToFile(this.memoryData);
    return updated;
  }

  public resetToSeed(): DatabaseSchema {
    this.memoryData = {
      books: INITIAL_BOOKS,
      almaris: INITIAL_ALMARIS,
      members: INITIAL_MEMBERS,
      transactions: INITIAL_TRANSACTIONS,
      seats: INITIAL_SEATS,
      resources: INITIAL_DIGITAL_RESOURCES,
      announcements: INITIAL_ANNOUNCEMENTS,
      suggestions: INITIAL_SUGGESTIONS,
      feedback: [],
      users: INITIAL_USERS
    };
    this.saveToFile(this.memoryData);
    return this.memoryData;
  }
}

export const db = new Database();
