import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Truck, DollarSign, AlertCircle, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { api } from "../../shared/api";

export const DashboardScreen: React.FC = () => {
  const [kpis, setKpis] = useState<any[]>([]);
  const [recentRentals, setRecentRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/api/v1/admin/dashboard');
        // Map backend icon string to actual React component if needed, but since icons are React components, 
        // we merge backend data with frontend icons
        const iconMap: Record<string, React.ReactElement> = {
          "Total Machines": <Truck size={24} color={C.teal} />,
          "Active Machines": <Truck size={24} color={C.orange} />,
          "Escrow Volume": <DollarSign size={24} color={C.green} />,
          "Action Required": <AlertCircle size={24} color={C.red} />
        };
        
        const backendKpis = res.data.kpis.map((k: any) => ({
          ...k,
          icon: iconMap[k.title] || <Activity size={24} />
        }));

        setKpis(backendKpis);
        setRecentRentals(res.data.recentRentals);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Dashboard</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Platform overview and key metrics.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <select style={{ padding: "8px 16px", borderRadius: R.sm, border: `1px solid ${C.border}`, background: C.white }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Year to Date</option>
          </select>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.navy, color: C.white, fontWeight: 600 }}>
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        {loading ? <div style={{ padding: "20px", color: C.slate }}>Loading KPIs...</div> : kpis.map((kpi, idx) => (
          <div key={idx} style={{ background: C.white, borderRadius: R.lg, padding: "20px", border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: R.md, background: kpi.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {kpi.icon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 8px", borderRadius: R.full, background: kpi.isUp ? "rgba(22,163,74,0.1)" : "rgba(239,68,68,0.1)", color: kpi.isUp ? C.green : C.red, fontSize: "12px", fontWeight: 700 }}>
                {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.trend}
              </div>
            </div>
            <div style={{ color: C.slate, fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{kpi.title}</div>
            <div style={{ color: C.navy, fontSize: "28px", fontWeight: 800, fontFamily: FONT.condensed }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Recent Activity Table */}
        <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card, overflow: "hidden" }}>
          <div style={{ padding: "20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.navy, margin: 0 }}>Recent Rentals</h2>
            <button style={{ color: C.teal, fontWeight: 600, fontSize: "14px" }}>View All</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Machine</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Renter</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Escrow</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: "20px", color: C.slate, textAlign: "center" }}>Loading rentals...</td></tr>
              ) : recentRentals.map((row, i) => (
                <tr key={i} style={{ borderBottom: i !== recentRentals.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <td style={{ padding: "16px 20px", color: C.slate, fontWeight: 500, fontSize: "14px" }}>{row.id}</td>
                  <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 600, fontSize: "14px" }}>{row.machine}</td>
                  <td style={{ padding: "16px 20px", color: C.navy, fontSize: "14px" }}>{row.renter}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ 
                      padding: "4px 8px", borderRadius: R.sm, fontSize: "12px", fontWeight: 600,
                      background: row.status === "Active" ? "rgba(13,148,136,0.1)" : row.status === "Completed" ? "rgba(22,163,74,0.1)" : "rgba(232,76,30,0.1)",
                      color: row.status === "Active" ? C.teal : row.status === "Completed" ? C.green : C.orange
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 700, fontSize: "14px" }}>{row.escrow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Required Panel */}
        <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
          <div style={{ padding: "20px", borderBottom: `1px solid ${C.border}` }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.navy, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={18} color={C.orange} /> Action Required
            </h2>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { type: "KYC Pending", desc: "45 new user registrations require KYC manual verification.", time: "2 hrs ago" },
              { type: "Dispute Escalated", desc: "R-8821: Machine returned with heavy damage. Escrow locked.", time: "4 hrs ago" },
              { type: "Emergency SOS", desc: "Komatsu PC210 engine failure reported at Site B (Pune).", time: "5 hrs ago" },
            ].map((alert, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px", paddingBottom: i !== 2 ? "16px" : 0, borderBottom: i !== 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: C.navy }}>{alert.type}</span>
                  <span style={{ fontSize: "12px", color: C.slate }}>{alert.time}</span>
                </div>
                <div style={{ fontSize: "13px", color: C.slate, lineHeight: 1.4 }}>{alert.desc}</div>
                <button style={{ color: C.teal, fontSize: "13px", fontWeight: 600, textAlign: "left", marginTop: "4px" }}>Resolve Now →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
