import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertAccountSchema, insertVoucherSchema, insertVoucherEntrySchema, insertPartySchema, insertDonorSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Accounts
  app.get("/api/accounts", async (req, res) => {
    try {
      const accounts = await storage.getAccounts();
      res.json(accounts);
    } catch (error) {
      console.error('Error getting accounts:', error);
      res.status(500).json({ message: "Failed to get accounts" });
    }
  });

  app.post("/api/accounts", async (req, res) => {
    try {
      const parsed = insertAccountSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const account = await storage.createAccount(parsed.data);
      res.json(account);
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  // Vouchers
  app.get("/api/vouchers", async (req, res) => {
    try {
      const vouchers = await storage.getVouchers();
      res.json(vouchers);
    } catch (error) {
      console.error('Error getting vouchers:', error);
      res.status(500).json({ message: "Failed to get vouchers" });
    }
  });

  app.get("/api/vouchers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const voucher = await storage.getVoucher(id);
      if (!voucher) {
        res.status(404).json({ error: "Voucher not found" });
        return;
      }
      const entries = await storage.getVoucherEntries(id);
      res.json({ ...voucher, entries });
    } catch (error) {
      console.error('Error getting voucher:', error);
      res.status(500).json({ message: "Failed to get voucher" });
    }
  });

  app.post("/api/vouchers", async (req, res) => {
    try {
      const parsed = insertVoucherSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const voucher = await storage.createVoucher(parsed.data);
      res.json(voucher);
    } catch (error) {
      console.error('Error creating voucher:', error);
      res.status(500).json({ message: "Failed to create voucher" });
    }
  });

  // Voucher Entries
  app.post("/api/voucher-entries", async (req, res) => {
    try {
      const parsed = insertVoucherEntrySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const entry = await storage.createVoucherEntry(parsed.data);
      res.json(entry);
    } catch (error) {
      console.error('Error creating voucher entry:', error);
      res.status(500).json({ message: "Failed to create voucher entry" });
    }
  });

  // Parties
  app.get("/api/parties", async (req, res) => {
    try {
      const parties = await storage.getParties();
      res.json(parties);
    } catch (error) {
      console.error('Error getting parties:', error);
      res.status(500).json({ message: "Failed to get parties" });
    }
  });

  app.post("/api/parties", async (req, res) => {
    try {
      const parsed = insertPartySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const party = await storage.createParty(parsed.data);
      res.json(party);
    } catch (error) {
      console.error('Error creating party:', error);
      res.status(500).json({ message: "Failed to create party" });
    }
  });

  // Donors
  app.get("/api/donors", async (req, res) => {
    try {
      const donors = await storage.getDonors();
      res.json(donors);
    } catch (error) {
      console.error('Error getting donors:', error);
      res.status(500).json({ message: "Failed to get donors" });
    }
  });

  app.post("/api/donors", async (req, res) => {
    try {
      const parsed = insertDonorSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const donor = await storage.createDonor(parsed.data);
      res.json(donor);
    } catch (error) {
      console.error('Error creating donor:', error);
      res.status(500).json({ message: "Failed to create donor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}