import {
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
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private accounts: Map<number, Account>;
  private vouchers: Map<number, Voucher>;
  private voucherEntries: Map<number, VoucherEntry>;
  private parties: Map<number, Party>;
  private donors: Map<number, Donor>;
  private currentId: { [key: string]: number };

  constructor() {
    this.accounts = new Map();
    this.vouchers = new Map();
    this.voucherEntries = new Map();
    this.parties = new Map();
    this.donors = new Map();
    this.currentId = {
      account: 1,
      voucher: 1,
      voucherEntry: 1,
      party: 1,
      donor: 1,
    };
  }

  // Accounts
  async getAccounts(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async getAccount(id: number): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    const id = this.currentId.account++;
    const newAccount = { ...account, id };
    this.accounts.set(id, newAccount);
    return newAccount;
  }

  async updateAccount(id: number, account: Partial<Account>): Promise<Account> {
    const existing = this.accounts.get(id);
    if (!existing) throw new Error("Account not found");
    const updated = { ...existing, ...account };
    this.accounts.set(id, updated);
    return updated;
  }

  // Vouchers
  async getVouchers(): Promise<Voucher[]> {
    return Array.from(this.vouchers.values());
  }

  async getVoucher(id: number): Promise<Voucher | undefined> {
    return this.vouchers.get(id);
  }

  async createVoucher(voucher: InsertVoucher): Promise<Voucher> {
    const id = this.currentId.voucher++;
    const newVoucher = { ...voucher, id };
    this.vouchers.set(id, newVoucher);
    return newVoucher;
  }

  async updateVoucher(id: number, voucher: Partial<Voucher>): Promise<Voucher> {
    const existing = this.vouchers.get(id);
    if (!existing) throw new Error("Voucher not found");
    const updated = { ...existing, ...voucher };
    this.vouchers.set(id, updated);
    return updated;
  }

  // Voucher Entries
  async getVoucherEntries(voucherId: number): Promise<VoucherEntry[]> {
    return Array.from(this.voucherEntries.values()).filter(
      (entry) => entry.voucherId === voucherId
    );
  }

  async createVoucherEntry(entry: InsertVoucherEntry): Promise<VoucherEntry> {
    const id = this.currentId.voucherEntry++;
    const newEntry = { ...entry, id };
    this.voucherEntries.set(id, newEntry);
    return newEntry;
  }

  // Parties
  async getParties(): Promise<Party[]> {
    return Array.from(this.parties.values());
  }

  async getParty(id: number): Promise<Party | undefined> {
    return this.parties.get(id);
  }

  async createParty(party: InsertParty): Promise<Party> {
    const id = this.currentId.party++;
    const newParty = { ...party, id };
    this.parties.set(id, newParty);
    return newParty;
  }

  async updateParty(id: number, party: Partial<Party>): Promise<Party> {
    const existing = this.parties.get(id);
    if (!existing) throw new Error("Party not found");
    const updated = { ...existing, ...party };
    this.parties.set(id, updated);
    return updated;
  }

  // Donors
  async getDonors(): Promise<Donor[]> {
    return Array.from(this.donors.values());
  }

  async getDonor(id: number): Promise<Donor | undefined> {
    return this.donors.get(id);
  }

  async createDonor(donor: InsertDonor): Promise<Donor> {
    const id = this.currentId.donor++;
    const newDonor = { ...donor, id };
    this.donors.set(id, newDonor);
    return newDonor;
  }

  async updateDonor(id: number, donor: Partial<Donor>): Promise<Donor> {
    const existing = this.donors.get(id);
    if (!existing) throw new Error("Donor not found");
    const updated = { ...existing, ...donor };
    this.donors.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
