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

export default function BalanceSheet() {
  const { data: accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["/api/accounts"]
  });

  const assets = accounts?.filter((a) => a.type === "ASSET") || [];
  const liabilities = accounts?.filter((a) => a.type === "LIABILITY") || [];

  const totalAssets = assets.reduce(
    (sum, a) => sum + parseFloat(a.balance.toString()),
    0
  );
  const totalLiabilities = liabilities.reduce(
    (sum, a) => sum + parseFloat(a.balance.toString()),
    0
  );
  const netAssets = totalAssets - totalLiabilities;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Sheet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div>
            <h3 className="font-semibold mb-2">Assets</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((account) => (
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
                  <TableCell>Total Assets</TableCell>
                  <TableCell className="text-right">
                    {totalAssets.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Liabilities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liabilities.map((account) => (
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
                  <TableCell>Total Liabilities</TableCell>
                  <TableCell className="text-right">
                    {totalLiabilities.toLocaleString("en-US", {
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
                  <TableCell>Net Assets</TableCell>
                  <TableCell className="text-right">
                    {netAssets.toLocaleString("en-US", {
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
