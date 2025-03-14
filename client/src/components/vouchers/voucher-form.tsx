import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertVoucherSchema, insertVoucherEntrySchema, VOUCHER_TYPES } from "@shared/schema";
import { useEffect } from "react";

interface VoucherFormProps {
  open: boolean;
  onClose: () => void;
}

export default function VoucherForm({ open, onClose }: VoucherFormProps) {
  const { toast } = useToast();

  // Fetch accounts for Dr/Cr selection
  const { data: accounts } = useQuery({
    queryKey: ["/api/accounts"],
    enabled: open,
  });

  // Get existing vouchers for numbering
  const { data: vouchers } = useQuery({
    queryKey: ["/api/vouchers"],
    enabled: open,
  });

  const form = useForm({
    resolver: zodResolver(insertVoucherSchema),
    defaultValues: {
      type: "JOURNAL",
      number: "",
      date: new Date().toISOString(),
      description: "",
      amount: "0",
      status: "DRAFT",
      debitAccount: "",
      creditAccount: "",
    },
  });

  // Generate next voucher number when form opens
  useEffect(() => {
    if (open && vouchers) {
      const nextNumber = (vouchers.length + 1).toString().padStart(4, '0');
      form.setValue('number', `V${nextNumber}`);
    }
  }, [open, vouchers, form]);

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      // First create the voucher
      const voucherRes = await apiRequest("POST", "/api/vouchers", {
        type: values.type,
        number: values.number,
        date: values.date,
        description: values.description,
        amount: values.amount,
        status: values.status,
      });

      if (!voucherRes.ok) {
        const error = await voucherRes.json();
        throw new Error(error.message || 'Failed to create voucher');
      }

      const voucher = await voucherRes.json();

      // Then create the entries
      const entries = [
        {
          voucherId: voucher.id,
          accountId: parseInt(values.debitAccount),
          debit: values.amount,
          credit: "0",
        },
        {
          voucherId: voucher.id,
          accountId: parseInt(values.creditAccount),
          debit: "0",
          credit: values.amount,
        },
      ];

      // Create both entries
      await Promise.all(
        entries.map(entry =>
          apiRequest("POST", "/api/voucher-entries", entry)
        )
      );

      return voucher;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vouchers"] });
      toast({
        title: "Success",
        description: "Voucher created successfully",
      });
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Voucher</DialogTitle>
          <DialogDescription>
            Create a new voucher for Chiniot Dialysis & Medical Centre
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select voucher type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VOUCHER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="debitAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Debit Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select debit account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts?.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creditAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts?.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Voucher
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}