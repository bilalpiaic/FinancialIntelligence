import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BalanceSheet from "@/components/reports/balance-sheet";
import IncomeStatement from "@/components/reports/income-statement";

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financial Reports</h1>

      <Tabs defaultValue="balance-sheet">
        <TabsList>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
        </TabsList>
        <TabsContent value="balance-sheet">
          <BalanceSheet />
        </TabsContent>
        <TabsContent value="income-statement">
          <IncomeStatement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
