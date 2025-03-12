import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Account, Voucher } from "@shared/schema";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { data: accounts } = useQuery<Account[]>({ 
    queryKey: ["/api/accounts"]
  });

  const { data: vouchers } = useQuery<Voucher[]>({
    queryKey: ["/api/vouchers"]
  });

  const chartData = accounts?.map(account => ({
    name: account.name,
    balance: parseFloat(account.balance.toString())
  })) || [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {accounts
                ?.filter(a => a.type === "ASSET")
                .reduce((sum, a) => sum + parseFloat(a.balance.toString()), 0)
                .toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {accounts
                ?.filter(a => a.type === "LIABILITY")
                .reduce((sum, a) => sum + parseFloat(a.balance.toString()), 0)
                .toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{vouchers?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="balance" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
