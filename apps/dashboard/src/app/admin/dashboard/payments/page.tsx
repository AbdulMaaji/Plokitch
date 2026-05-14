import * as React from "react"
import { CreditCard, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaymentTable } from "@/components/payments/PaymentTable"
import { api } from "@/lib/api"

export default async function PaymentsPage() {
  const transactions = await api.payments.getTransactions();
  const pendingPayouts = await api.payments.getPendingPayouts();

  // Calculate quick metrics
  const totalVolume = transactions.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const pendingAmount = pendingPayouts.reduce((acc, curr) => acc + (curr.pendingAmount || 0), 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Payment Operations</h1>
          <p className="text-[15px] font-medium text-subtle/80">Manage platform payouts, refunds, and financial health.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-11 px-6 border-divider">
            <Wallet size={18} /> SETTLEMENTS
          </Button>
          <Button className="bg-navy hover:bg-navy/90 text-white flex items-center gap-2 h-11 px-6 shadow-sm">
            <CreditCard size={18} /> INITIATE PAYOUT
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Platform Volume (Gross)</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">₦{totalVolume.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Pending Payouts</p>
          <h3 className="text-[28px] font-bold text-orange-600 mt-1">₦{pendingAmount.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-card border border-divider shadow-card transition-all hover:shadow-md">
          <p className="text-[12px] font-bold text-subtle uppercase tracking-widest">Transaction Count</p>
          <h3 className="text-[28px] font-bold text-navy mt-1">{transactions.length}</h3>
        </div>
      </div>

      {/* Table Section */}
      <PaymentTable initialData={transactions} />
    </div>
  )
}
