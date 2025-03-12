import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Account } from "@shared/schema";

export default function IncomeStatement() {
  const { data: accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["/api/accounts"]
  });

  const incomeAccounts = accounts?.filter((a) => a.type === "INCOME") || [];
  const expenseAccounts = accounts?.filter((a) => a.type === "EXPENSE") || [];

  const totalIncome = incomeAccounts.reduce(
    (sum, a) => sum + parseFloat(a.balance.toString()),
    0
  );
  const totalExpenses = expenseAccounts.reduce(
    (sum, a) => sum + parseFloat(a.balance.toString()),
    0
  );
  const netIncome = totalIncome - totalExpenses;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Statement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div>
            <h3 className="font-semibold mb-2">Income</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {parseFloat(account.balance.toString()).toLocaleString(
                        "en-US",
                        { style: "currency", currency: "USD" }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell>Total Income</TableCell>
                  <TableCell className="text-right">
                    {totalIncome.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Expenses</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {parseFloat(account.balance.toString()).toLocaleString(
                        "en-US",
                        { style: "currency", currency: "USD" }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell>Total Expenses</TableCell>
                  <TableCell className="text-right">
                    {totalExpenses.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="border-t pt-4">
            <Table>
              <TableBody>
                <TableRow className="font-bold text-lg">
                  <TableCell>Net Income</TableCell>
                  <TableCell className="text-right">
                    {netIncome.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
