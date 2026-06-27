import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, TrendingUp, DollarSign, Activity } from "lucide-react";
import { api } from "../../shared/api";

export const InvestmentScreen: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await api.get('/api/v1/investment/assets');
        setAssets(res.data);
      } catch (error) {
        console.error("Failed to fetch investment assets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Equipment Investment</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Manage fractional ownership listings and investor yields.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.orange, color: C.white, fontWeight: 600 }}>
            List New Asset
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Assets Funded", value: "$4.2M", icon: <TrendingUp size={24} color={C.teal} /> },
          { label: "Active Investors", value: "842", icon: <Activity size={24} color={C.orange} /> },
          { label: "Avg Annual Yield", value: "18.4%", icon: <DollarSign size={24} color={C.green} /> }
        ].map(stat => (
          <div key={stat.label} style={{ background: C.white, padding: "20px", borderRadius: R.md, boxShadow: SHADOW.card, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ color: C.slate, fontSize: "14px", fontWeight: 500 }}>{stat.label}</div>
              {stat.icon}
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: C.navy, fontFamily: FONT.condensed }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input type="text" placeholder="Search assets by ID or type..." style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px", outline: "none" }} />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Asset ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Total Shares</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Price Per Share</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading assets...</td>
                </tr>
              ) : assets.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: C.slate }}>No fractional assets found.</td>
                </tr>
              ) : (
                assets.map((asset, i) => (
                  <tr key={asset.ownership_id} style={{ borderBottom: i !== assets.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 700, fontSize: "14px" }}>{asset.listing_id || asset.ownership_id.split('-')[0]}</td>
                    <td style={{ padding: "16px 20px", color: C.slate }}>{asset.total_shares}</td>
                    <td style={{ padding: "16px 20px", color: C.slate }}>${asset.price_per_share}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ padding: "4px 8px", borderRadius: R.sm, fontSize: "12px", fontWeight: 600, background: asset.status === 'active' ? C.green + '20' : C.slate + '20', color: asset.status === 'active' ? C.green : C.slate }}>
                        {asset.status.toUpperCase()}
                      </span>
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
