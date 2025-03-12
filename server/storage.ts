import {
  accounts,
  vouchers,
  voucherEntries,
  parties,
  donors,
  users,
  type Account,
  type InsertAccount,
  type Voucher,
  type InsertVoucher,
  type VoucherEntry,
  type InsertVoucherEntry,
  type Party,
  type InsertParty,
  type Donor,
  type InsertDonor,
  type User,
  type InsertUser,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Accounts
  getAccounts(): Promise<Account[]>;
  getAccount(id: number): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccount(id: number, account: Partial<Account>): Promise<Account>;

  // Vouchers
  getVouchers(): Promise<Voucher[]>;
  getVoucher(id: number): Promise<Voucher | undefined>;
  createVoucher(voucher: InsertVoucher): Promise<Voucher>;
  updateVoucher(id: number, voucher: Partial<Voucher>): Promise<Voucher>;

  // Voucher Entries
  getVoucherEntries(voucherId: number): Promise<VoucherEntry[]>;
  createVoucherEntry(entry: InsertVoucherEntry): Promise<VoucherEntry>;

  // Parties
  getParties(): Promise<Party[]>;
  getParty(id: number): Promise<Party | undefined>;
  createParty(party: InsertParty): Promise<Party>;
  updateParty(id: number, party: Partial<Party>): Promise<Party>;

  // Donors
  getDonors(): Promise<Donor[]>;
  getDonor(id: number): Promise<Donor | undefined>;
  createDonor(donor: InsertDonor): Promise<Donor>;
  updateDonor(id: number, donor: Partial<Donor>): Promise<Donor>;

  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Accounts
  async getAccounts(): Promise<Account[]> {
    const result = await db.select().from(accounts);
    return result as Account[];
  }

  async getAccount(id: number): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
    return account as Account | undefined;
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    const [newAccount] = await db.insert(accounts).values(account).returning();
    return newAccount as Account;
  }

  async updateAccount(id: number, account: Partial<Account>): Promise<Account> {
    const [updated] = await db
      .update(accounts)
      .set(account)
      .where(eq(accounts.id, id))
      .returning();
    return updated as Account;
  }

  // Vouchers
  async getVouchers(): Promise<Voucher[]> {
    return await db.select().from(vouchers);
  }

  async getVoucher(id: number): Promise<Voucher | undefined> {
    const [voucher] = await db.select().from(vouchers).where(eq(vouchers.id, id));
    return voucher;
  }

  async createVoucher(voucher: InsertVoucher): Promise<Voucher> {
    const [newVoucher] = await db.insert(vouchers).values(voucher).returning();
    return newVoucher;
  }

  async updateVoucher(id: number, voucher: Partial<Voucher>): Promise<Voucher> {
    const [updated] = await db
      .update(vouchers)
      .set(voucher)
      .where(eq(vouchers.id, id))
      .returning();
    return updated;
  }

  // Voucher Entries
  async getVoucherEntries(voucherId: number): Promise<VoucherEntry[]> {
    return await db
      .select()
      .from(voucherEntries)
      .where(eq(voucherEntries.voucherId, voucherId));
  }

  async createVoucherEntry(entry: InsertVoucherEntry): Promise<VoucherEntry> {
    const [newEntry] = await db.insert(voucherEntries).values(entry).returning();
    return newEntry;
  }

  // Parties
  async getParties(): Promise<Party[]> {
    return await db.select().from(parties);
  }

  async getParty(id: number): Promise<Party | undefined> {
    const [party] = await db.select().from(parties).where(eq(parties.id, id));
    return party;
  }

  async createParty(party: InsertParty): Promise<Party> {
    const [newParty] = await db.insert(parties).values(party).returning();
    return newParty;
  }

  async updateParty(id: number, party: Partial<Party>): Promise<Party> {
    const [updated] = await db
      .update(parties)
      .set(party)
      .where(eq(parties.id, id))
      .returning();
    return updated;
  }

  // Donors
  async getDonors(): Promise<Donor[]> {
    return await db.select().from(donors);
  }

  async getDonor(id: number): Promise<Donor | undefined> {
    const [donor] = await db.select().from(donors).where(eq(donors.id, id));
    return donor;
  }

  async createDonor(donor: InsertDonor): Promise<Donor> {
    const [newDonor] = await db.insert(donors).values(donor).returning();
    return newDonor;
  }

  async updateDonor(id: number, donor: Partial<Donor>): Promise<Donor> {
    const [updated] = await db
      .update(donors)
      .set(donor)
      .where(eq(donors.id, id))
      .returning();
    return updated;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
}

export const storage = new DatabaseStorage();