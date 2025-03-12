import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertAccountSchema, insertVoucherSchema, insertPartySchema, insertDonorSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  // Accounts
  app.get("/api/accounts", async (req, res) => {
    const accounts = await storage.getAccounts();
    res.json(accounts);
  });

  app.post("/api/accounts", async (req, res) => {
    const parsed = insertAccountSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const account = await storage.createAccount(parsed.data);
    res.json(account);
  });

  // Vouchers
  app.get("/api/vouchers", async (req, res) => {
    const vouchers = await storage.getVouchers();
    res.json(vouchers);
  });

  app.get("/api/vouchers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const voucher = await storage.getVoucher(id);
    if (!voucher) {
      res.status(404).json({ error: "Voucher not found" });
      return;
    }
    const entries = await storage.getVoucherEntries(id);
    res.json({ ...voucher, entries });
  });

  app.post("/api/vouchers", async (req, res) => {
    const parsed = insertVoucherSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const voucher = await storage.createVoucher(parsed.data);
    res.json(voucher);
  });

  // Parties
  app.get("/api/parties", async (req, res) => {
    const parties = await storage.getParties();
    res.json(parties);
  });

  app.post("/api/parties", async (req, res) => {
    const parsed = insertPartySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const party = await storage.createParty(parsed.data);
    res.json(party);
  });

  // Donors
  app.get("/api/donors", async (req, res) => {
    const donors = await storage.getDonors();
    res.json(donors);
  });

  app.post("/api/donors", async (req, res) => {
    const parsed = insertDonorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error });
      return;
    }
    const donor = await storage.createDonor(parsed.data);
    res.json(donor);
  });

  const httpServer = createServer(app);
  return httpServer;
}
