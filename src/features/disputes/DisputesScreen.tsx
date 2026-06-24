import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, Gavel } from "lucide-react";

interface Dispute {
  id: string;
  rentalId: string;
  parties: string;
  issue: string;
  status: "Open" | "In Review" | "Resolved";
  escrowLocked: string;
  dateFiled: string;
}

export const DisputesScreen: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking API call for Disputes
    setTimeout(() => {
      setDisputes([
        { id: "DSP-092", rentalId: "R-8821", parties: "Apex Builders vs L&T Heavy", issue: "Machine returned with broken hydraulic arm", status: "Open", escrowLocked: "₹1,45,000", dateFiled: "2026-06-24" },
        { id: "DSP-091", rentalId: "R-8815", parties: "Ramesh Kumar vs Mega Infra", issue: "Excess engine hours beyond agreed limit", status: "In Review", escrowLocked: "₹25,000", dateFiled: "2026-06-22" },
        { id: "DSP-090", rentalId: "R-8802", parties: "SKS Logistics vs Volvo CE", issue: "Late delivery dispute", status: "Resolved", escrowLocked: "₹0", dateFiled: "2026-06-18" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Dispute Resolution Center</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Manage active conflicts, review evidence, and arbitrate escrow.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 600 }}>
            Arbitration Guidelines
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input 
              type="text" 
              placeholder="Search by Dispute ID, Rental ID, or Party..." 
              style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }}
            />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 500, fontSize: "14px" }}>
            <Filter size={16} /> Status
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Dispute ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Issue Details</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Escrow Locked</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading disputes...</td>
                </tr>
              ) : (
                disputes.map((dispute, i) => (
                  <tr key={dispute.id} style={{ borderBottom: i !== disputes.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ color: C.navy, fontWeight: 600 }}>{dispute.id}</div>
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>Rental: <span style={{ color: C.teal, fontWeight: 600 }}>{dispute.rentalId}</span></div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ color: C.navy, fontWeight: 700, marginBottom: "2px" }}>{dispute.parties}</div>
                      <div style={{ color: C.slate, fontSize: "13px" }}>{dispute.issue}</div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.red, fontWeight: 800, fontSize: "15px", fontFamily: FONT.condensed }}>
                      {dispute.escrowLocked}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ 
                        padding: "4px 8px", borderRadius: R.sm, fontSize: "12px", fontWeight: 600,
                        background: dispute.status === "Open" ? "rgba(239,68,68,0.1)" : dispute.status === "In Review" ? "rgba(232,76,30,0.1)" : "rgba(22,163,74,0.1)",
                        color: dispute.status === "Open" ? C.red : dispute.status === "In Review" ? C.orange : C.green
                      }}>
                        {dispute.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 12px", borderRadius: R.sm, background: C.navyLight, color: C.white, fontSize: "13px", fontWeight: 600 }}>
                        <Gavel size={14} /> Arbitrate
                      </button>
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
