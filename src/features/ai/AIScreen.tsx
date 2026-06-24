import React, { useState, useEffect } from "react";
import { C, FONT, R, SHADOW } from "../../shared/tokens";
import { Brain, Cpu, Database, Activity, RefreshCw, Zap } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  status: "Online" | "Training" | "Offline";
  accuracy: string;
  lastTrained: string;
}

export const AIScreen: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setModels([
        { id: "MOD-01", name: "Eco-Score Evaluator v2.4", status: "Online", accuracy: "94.2%", lastTrained: "Today, 02:00 AM" },
        { id: "MOD-02", name: "Predictive Maintenance (Hydraulics)", status: "Online", accuracy: "89.7%", lastTrained: "Yesterday, 03:30 AM" },
        { id: "MOD-03", name: "Dynamic Pricing Engine", status: "Training", accuracy: "--", lastTrained: "In Progress (45%)" },
        { id: "MOD-04", name: "Fraud Detection (KYC)", status: "Online", accuracy: "99.1%", lastTrained: "2026-06-20" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "32px", fontWeight: 800, color: C.navy, margin: 0, display: "flex", alignItems: "center", gap: "12px" }}>
            <Brain color={C.teal} size={32} /> BluFleet AI Hub
          </h1>
          <p style={{ color: C.slate, margin: "4px 0 0 0" }}>Manage ML models, analytics pipelines, and dynamic pricing engines.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "8px 16px", borderRadius: R.sm, background: C.navy, color: C.white, fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
            <RefreshCw size={16} /> Force Retrain All
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
        <div style={{ background: C.navy, color: C.white, borderRadius: R.lg, padding: "24px", boxShadow: SHADOW.card, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", top: "-20px", opacity: 0.1 }}><Cpu size={120} /></div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 16px 0", fontFamily: FONT.condensed }}>System Health</h3>
          <div style={{ display: "flex", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "12px", color: C.slateLight }}>API Latency</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: C.green }}>42ms</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: C.slateLight }}>Inference Rate</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: C.tealLight }}>1.2k/sec</div>
            </div>
          </div>
        </div>

        <div style={{ background: C.white, borderRadius: R.lg, padding: "24px", border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.navy, margin: "0 0 16px 0", fontFamily: FONT.condensed }}>Active Pipeline</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, background: C.offWhite, height: "8px", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: "75%", background: C.teal, height: "100%", animation: "pulse 2s infinite" }} />
            </div>
            <span style={{ fontSize: "14px", fontWeight: 700, color: C.teal }}>Processing Telemetry Batch (75%)</span>
          </div>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: R.lg, border: `1px solid ${C.border}`, boxShadow: SHADOW.card }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "16px", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.navy, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Database size={18} /> Model Registry
          </h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: C.offWhite, color: C.slate, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Model Name & ID</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Confidence/Accuracy</th>
                <th style={{ padding: "12px 20px", fontWeight: 600 }}>Last Trained</th>
                <th style={{ padding: "12px 20px", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: C.slate }}>Loading models...</td>
                </tr>
              ) : (
                models.map((model, i) => (
                  <tr key={model.id} style={{ borderBottom: i !== models.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.2s" }}>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ color: C.navy, fontWeight: 700, fontSize: "14px" }}>{model.name}</div>
                      <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>{model.id}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {model.status === "Online" ? <Activity size={16} color={C.green} /> : 
                         model.status === "Training" ? <RefreshCw size={16} color={C.teal} className="spin" /> : 
                         <Zap size={16} color={C.slate} />}
                        <span style={{ fontSize: "13px", fontWeight: 600, color: model.status === "Online" ? C.green : model.status === "Training" ? C.teal : C.slate }}>
                          {model.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", color: C.navy, fontWeight: 800, fontSize: "15px" }}>
                      {model.accuracy}
                    </td>
                    <td style={{ padding: "16px 20px", color: C.slate, fontSize: "14px" }}>{model.lastTrained}</td>
                    <td style={{ padding: "16px 20px", textAlign: "right", gap: "8px" }}>
                       <button style={{ padding: "6px 12px", borderRadius: R.sm, border: `1px solid ${C.border}`, fontSize: "12px", fontWeight: 600, color: C.navy }}>Logs</button>
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
