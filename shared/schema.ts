import { pgTable, text, serial, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Voucher types
export const VOUCHER_TYPES = ["JOURNAL", "RECEIPT", "PAYMENT"] as const;
export type VoucherType = typeof VOUCHER_TYPES[number];

// Account types
export const ACCOUNT_TYPES = ["ASSET", "LIABILITY", "INCOME", "EXPENSE"] as const;
export type AccountType = typeof ACCOUNT_TYPES[number];

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  type: text("type", { enum: ACCOUNT_TYPES }).notNull(),
  balance: numeric("balance").notNull().default("0"),
});

export const vouchers = pgTable("vouchers", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: VOUCHER_TYPES }).notNull(),
  number: text("number").notNull().unique(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  amount: numeric("amount").notNull(),
  status: text("status").notNull().default("DRAFT"),
});

export const voucherEntries = pgTable("voucher_entries", {
  id: serial("id").primaryKey(),
  voucherId: serial("voucher_id").references(() => vouchers.id),
  accountId: serial("account_id").references(() => accounts.id),
  debit: numeric("debit").notNull().default("0"),
  credit: numeric("credit").notNull().default("0"),
});

export const parties = pgTable("parties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // customer/supplier
  balance: numeric("balance").notNull().default("0"),
});

export const donors = pgTable("donors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  totalDonations: numeric("total_donations").notNull().default("0"),
});

// Insert schemas
export const insertAccountSchema = createInsertSchema(accounts);
export const insertVoucherSchema = createInsertSchema(vouchers);
export const insertVoucherEntrySchema = createInsertSchema(voucherEntries);
export const insertPartySchema = createInsertSchema(parties);
export const insertDonorSchema = createInsertSchema(donors);

// Types
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;

export type Voucher = typeof vouchers.$inferSelect;
export type InsertVoucher = z.infer<typeof insertVoucherSchema>;

export type VoucherEntry = typeof voucherEntries.$inferSelect;
export type InsertVoucherEntry = z.infer<typeof insertVoucherEntrySchema>;

export type Party = typeof parties.$inferSelect;
export type InsertParty = z.infer<typeof insertPartySchema>;

export type Donor = typeof donors.$inferSelect;
export type InsertDonor = z.infer<typeof insertDonorSchema>;
