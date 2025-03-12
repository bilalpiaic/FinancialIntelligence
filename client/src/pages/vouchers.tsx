import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoucherForm from "@/components/vouchers/voucher-form";
import type { Voucher } from "@shared/schema";
import { Plus } from "lucide-react";

export default function Vouchers() {
  const [showForm, setShowForm] = useState(false);
  
  const { data: vouchers, isLoading } = useQuery<Voucher[]>({
    queryKey: ["/api/vouchers"]
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vouchers</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Voucher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Vouchers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                vouchers?.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>{voucher.number}</TableCell>
                    <TableCell>{voucher.type}</TableCell>
                    <TableCell>
                      {new Date(voucher.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{voucher.description}</TableCell>
                    <TableCell>
                      {parseFloat(voucher.amount.toString()).toLocaleString(
                        "en-US",
                        { style: "currency", currency: "USD" }
                      )}
                    </TableCell>
                    <TableCell>{voucher.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <VoucherForm open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
