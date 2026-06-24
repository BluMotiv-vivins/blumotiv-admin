import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, Navigation, CheckCircle, Clock, Map } from "lucide-react";

interface TransportJob {
  id: string;
  rentalId: string;
  machine: string;
  route: string;
  status: "In Transit" | "Delivered" | "Scheduled";
  eta: string;
}

export const TransportScreen: React.FC = () => {
  const [jobs, setJobs] = useState<TransportJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: "TR-1029", rentalId: "R-8839", machine: "Komatsu PC210", route: "Pune → Mumbai Site C", status: "In Transit", eta: "Today, 14:00" },
        { id: "TR-1030", rentalId: "R-8840", machine: "Tata Prima 2830", route: "Depot A → Site B", status: "Scheduled", eta: "Tomorrow, 09:00" },
        { id: "TR-1028", rentalId: "R-8835", machine: "JCB 3DX Eco", route: "Chennai → Bangalore", status: "Delivered", eta: "Yesterday, 18:30" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Transport & Logistics</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Manage machine delivery tracking and flatbed dispatch operations.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.navy, color: C.white, fontWeight: 600 }}>
            Dispatch New Flatbed
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input type="text" placeholder="Search by TR ID or Route..." style={{ border: "none", background: "transparent", width: "100%", color: C.navy, fontSize: "14px" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 500, fontSize: "14px" }}>
            <Filter size={16} /> Filter Status
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Transport ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Machine & Rental</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Route</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>ETA</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading transport jobs...</td>
                </tr>
              ) : (
                jobs.map((job, i) => (
                  <tr key={job.id} style={{ borderBottom: i !== jobs.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 600, fontSize: "14px" }}>{job.id}</td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ color: C.navy, fontWeight: 700 }}>{job.machine}</div>
                      <div style={{ color: C.teal, fontSize: "12px", fontWeight: 600, marginTop: "2px" }}>Rental: {job.rentalId}</div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.slate }}>
                        <Map size={14} /> {job.route}
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 500, fontSize: "14px" }}>{job.eta}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {job.status === "Delivered" ? <CheckCircle size={16} color={C.green} /> : 
                         job.status === "In Transit" ? <Clock size={16} color={C.teal} /> : 
                         <MapPin size={16} color={C.orange} />}
                        <span style={{ fontSize: "13px", fontWeight: 600, color: job.status === "Delivered" ? C.green : job.status === "In Transit" ? C.teal : C.orange }}>
                          {job.status}
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
