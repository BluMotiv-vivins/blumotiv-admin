import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, Wrench, AlertOctagon, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ServiceRecord {
  id: string;
  machineId: string;
  type: "Emergency SOS" | "Routine Service" | "Breakdown";
  description: string;
  status: "Resolved" | "In Progress" | "Pending Dispatch";
  date: string;
}

export const MaintenanceScreen: React.FC = () => {
  const [records, setRecords] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecords([
        { id: "SR-501", machineId: "EQ-4501", type: "Emergency SOS", description: "Engine overheating warning", status: "In Progress", date: "2026-06-24 14:30" },
        { id: "SR-502", machineId: "EQ-4504", type: "Routine Service", description: "5000hr fluid change", status: "Pending Dispatch", date: "2026-06-23 09:00" },
        { id: "SR-503", machineId: "EQ-4420", type: "Breakdown", description: "Hydraulic leak on boom arm", status: "Resolved", date: "2026-06-21 11:15" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Maintenance & SOS</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Track emergency signals and routine maintenance dispatches.</p>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input type="text" placeholder="Search by Machine ID or SOS ID..." style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 500, fontSize: "14px" }}>
            <Filter size={16} /> Filter
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Ticket ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Machine ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Issue Type</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Description</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading records...</td>
                </tr>
              ) : (
                records.map((record, i) => (
                  <tr key={record.id} style={{ borderBottom: i !== records.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 600, fontSize: "14px" }}>
                      {record.id}
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "4px" }}>{record.date}</div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.teal, fontWeight: 600, fontSize: "14px" }}>{record.machineId}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {record.type === "Emergency SOS" ? <AlertOctagon size={16} color={C.red} /> : 
                         record.type === "Breakdown" ? <AlertOctagon size={16} color={C.orange} /> : 
                         <Wrench size={16} color={C.slate} />}
                        <span style={{ fontSize: "13px", fontWeight: 600, color: record.type === "Emergency SOS" ? C.red : C.navy }}>
                          {record.type}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.slate, fontSize: "14px" }}>{record.description}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {record.status === "Resolved" ? <CheckCircle size={16} color={C.green} /> : 
                         record.status === "In Progress" ? <Clock size={16} color={C.teal} /> : 
                         <AlertCircle size={16} color={C.orange} />}
                        <span style={{ fontSize: "13px", fontWeight: 600, color: record.status === "Resolved" ? C.green : record.status === "In Progress" ? C.teal : C.orange }}>
                          {record.status}
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
