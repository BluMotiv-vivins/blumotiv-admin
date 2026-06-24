import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Search, Filter, Activity, WifiOff, Wifi, MapPin, Truck } from "lucide-react";

interface Machine {
  id: string;
  name: string;
  owner: string;
  type: string;
  status: "Working" | "Idle" | "Offline" | "Maintenance";
  location: string;
  telemetry: {
    fuelLevel: string;
    engineHours: string;
    lastPing: string;
  };
}

export const FleetScreen: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking API call for Fleet Telemetry
    setTimeout(() => {
      setMachines([
        { id: "EQ-4501", name: "Caterpillar 320", owner: "L&T Heavy Equip", type: "Excavator", status: "Working", location: "Pune Site B", telemetry: { fuelLevel: "45%", engineHours: "3,420h", lastPing: "2 mins ago" } },
        { id: "EQ-4502", name: "JCB 3DX Super", owner: "Ramesh Kumar", type: "Backhoe", status: "Idle", location: "Mumbai Depot", telemetry: { fuelLevel: "78%", engineHours: "1,240h", lastPing: "1 min ago" } },
        { id: "EQ-4503", name: "Volvo EC210D", owner: "Balaji Earthmovers", type: "Excavator", status: "Offline", location: "Chennai Ring Road", telemetry: { fuelLevel: "--", engineHours: "5,100h", lastPing: "4 hours ago" } },
        { id: "EQ-4504", name: "Tata Prima 2830", owner: "SKS Logistics", type: "Tipper", status: "Maintenance", location: "Workshop A", telemetry: { fuelLevel: "12%", engineHours: "8,900h", lastPing: "2 days ago" } },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0 }}>Fleet & Telemetry</h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Global view of all connected machines and their live status.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, border: `1px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 600 }}>
            View Global Map
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: C.offWhite, padding: "8px 16px", borderRadius: R.md, border: `1px solid ${C.border}` }}>
            <Search size={18} color={C.slate} />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Location..." 
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
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Machine ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Details & Owner</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Location</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Telemetry (Live)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading fleet data...</td>
                </tr>
              ) : (
                machines.map((machine, i) => (
                  <tr key={machine.id} style={{ borderBottom: i !== machines.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px", color: C.slate, fontWeight: 500, fontSize: "14px" }}>{machine.id}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ color: C.navy, fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Truck size={14} color={C.slate} /> {machine.name}
                      </div>
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>{machine.type} • {machine.owner}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {machine.status === "Working" ? <Activity size={16} color={C.green} /> : 
                         machine.status === "Offline" ? <WifiOff size={16} color={C.slateLight} /> :
                         machine.status === "Maintenance" ? <Activity size={16} color={C.orange} /> :
                         <Wifi size={16} color={C.teal} />}
                        <span style={{ 
                          fontSize: "13px", fontWeight: 600,
                          color: machine.status === "Working" ? C.green : 
                                 machine.status === "Idle" ? C.teal :
                                 machine.status === "Maintenance" ? C.orange : C.slate
                        }}>
                          {machine.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: C.navy }}>
                        <MapPin size={14} color={C.slate} /> {machine.location}
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "13px", color: C.slate }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div><strong>Fuel:</strong> <span style={{ color: C.navy }}>{machine.telemetry.fuelLevel}</span></div>
                        <div><strong>Hrs:</strong> <span style={{ color: C.navy }}>{machine.telemetry.engineHours}</span></div>
                        <div style={{ gridColumn: "span 2", fontSize: "11px", color: machine.status === "Offline" ? C.red : C.slate }}>
                          Last ping: {machine.telemetry.lastPing}
                        </div>
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
