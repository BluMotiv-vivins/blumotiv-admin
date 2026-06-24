import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Box, Settings2, BarChart2 } from "lucide-react";

export const OEMScreen: React.FC = () => {
  const [dealers, setDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDealers([
        { id: "DLR-992", name: "L&T Construction Equipment", brand: "Komatsu", city: "Pune", activeModels: 45, salesYTD: "₹45.2Cr" },
        { id: "DLR-993", name: "Volvo CE India Private", brand: "Volvo", city: "Bangalore", activeModels: 32, salesYTD: "₹28.4Cr" },
        { id: "DLR-994", name: "JCB India Limited", brand: "JCB", city: "Delhi", activeModels: 120, salesYTD: "₹82.1Cr" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>OEM & Dealer Network</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Manage authorized dealers, brand specifications, and direct sales metrics.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.navy, color: C.white, fontWeight: 600 }}>
            Onboard Dealer
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input type="text" placeholder="Search by Dealer Name or Brand..." style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }} />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Dealer ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Dealer Name & Location</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Authorized Brand</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Active Models on Platform</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Sales (YTD)</th>
                <th style={{ padding: "12px 20px", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading network...</td>
                </tr>
              ) : (
                dealers.map((dealer, i) => (
                  <tr key={dealer.id} style={{ borderBottom: i !== dealers.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", color: C.slate, fontWeight: 500, fontSize: "14px" }}>{dealer.id}</td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ color: C.navy, fontWeight: 700 }}>{dealer.name}</div>
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>{dealer.city}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ padding: "4px 8px", borderRadius: R.sm, fontSize: "12px", fontWeight: 600, background: C.navyLight, color: C.white }}>
                        {dealer.brand}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 600, fontSize: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Box size={14} color={C.slate} /> {dealer.activeModels}
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 800, fontSize: "15px", fontFamily: FONT.condensed }}>
                      {dealer.salesYTD}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <button style={{ padding: "4px", color: C.slate, marginRight: "8px" }}><Settings2 size={18} /></button>
                      <button style={{ padding: "4px", color: C.teal }}><BarChart2 size={18} /></button>
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
