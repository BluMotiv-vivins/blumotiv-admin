import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Lock, CheckCircle } from "lucide-react";
import { api } from "../../shared/api";

interface Transaction {
  id: string;
  date: string;
  type: "Rental Payment" | "Escrow Release" | "Machine Purchase" | "Platform Fee";
  parties: string;
  amount: string;
  status: "Completed" | "Pending Escrow" | "Failed";
}

export const FinanceScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/api/v1/admin/finance');
        setTransactions(res.data.transactions || []);
        setKpis(res.data.kpis || null);
      } catch (error) {
        console.error("Failed to fetch finance ledger", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Finance & Escrow</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Ledger of all platform transactions, escrow holds, and fees.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.navy, color: C.white, fontWeight: 600 }}>
            Export Ledger
          </button>
        </div>
      </div>

      {/* Mini KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: C.white, borderRadius: R.lg, padding: "20px", border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
          <div style={{ color: C.slate, fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Total Escrow Held</div>
          <div style={{ color: C.navy, fontSize: "28px", fontWeight: 800, fontFamily: FONT.condensed }}>{kpis ? kpis.totalEscrow : "₹0"}</div>
          <div style={{ color: kpis?.totalEscrowTrend?.startsWith('+') ? C.green : C.red, fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
            {kpis?.totalEscrowTrend?.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpis?.totalEscrowTrend || "0%"} this month
          </div>
        </div>
        <div style={{ background: C.white, borderRadius: R.lg, padding: "20px", border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
          <div style={{ color: C.slate, fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Platform Fees (30d)</div>
          <div style={{ color: C.navy, fontSize: "28px", fontWeight: 800, fontFamily: FONT.condensed }}>{kpis ? kpis.platformFees : "₹0"}</div>
          <div style={{ color: kpis?.platformFeesTrend?.startsWith('+') ? C.green : C.red, fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
            {kpis?.platformFeesTrend?.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpis?.platformFeesTrend || "0%"} this month
          </div>
        </div>
        <div style={{ background: C.white, borderRadius: R.lg, padding: "20px", border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
          <div style={{ color: C.slate, fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Failed Transactions</div>
          <div style={{ color: C.navy, fontSize: "28px", fontWeight: 800, fontFamily: FONT.condensed }}>{kpis ? kpis.failedTransactions : "0"}</div>
          <div style={{ color: C.red, fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}><ArrowDownRight size={14} /> Requires attention</div>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input 
              type="text" 
              placeholder="Search by TX ID or party name..." 
              style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }}
            />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 500, fontSize: "14px" }}>
            <Filter size={16} /> Filter Date
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>TX ID & Date</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Type</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Parties</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Amount</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading ledger...</td>
                </tr>
              ) : (
                transactions.map((tx, i) => (
                  <tr key={tx.id} style={{ borderBottom: i !== transactions.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ color: C.navy, fontWeight: 600 }}>{tx.id}</div>
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>{tx.date}</div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 500, fontSize: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {tx.type === "Platform Fee" ? <DollarSign size={14} color={C.green} /> : <CreditCard size={14} color={C.slate} />}
                        {tx.type}
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.slate, fontSize: "14px" }}>{tx.parties}</td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 800, fontSize: "15px", fontFamily: FONT.condensed }}>{tx.amount}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {tx.status === "Completed" ? <CheckCircle size={16} color={C.green} /> : 
                         tx.status === "Pending Escrow" ? <Lock size={16} color={C.orange} /> : 
                         <ArrowDownRight size={16} color={C.red} />}
                        <span style={{ 
                          fontSize: "13px", fontWeight: 600,
                          color: tx.status === "Completed" ? C.green : tx.status === "Pending Escrow" ? C.orange : C.red
                        }}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
