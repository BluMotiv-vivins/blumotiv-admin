import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { C, FONT, R } from "../../shared/tokens";
import { LayoutDashboard, Users, ShoppingCart, Truck, CreditCard, AlertTriangle, Settings, LogOut, Wrench, Navigation, Box, Brain } from "lucide-react";

export const AppShell: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/users", label: "Users", icon: <Users size={18} /> },
    { path: "/marketplace", label: "Marketplace", icon: <ShoppingCart size={18} /> },
    { path: "/fleet", label: "Fleet & Telemetry", icon: <Truck size={18} /> },
    { path: "/finance", label: "Finance", icon: <CreditCard size={18} /> },
    { path: "/disputes", label: "Disputes", icon: <AlertTriangle size={18} /> },
    { path: "/maintenance", label: "Maintenance & SOS", icon: <Wrench size={18} /> },
    { path: "/transport", label: "Transport Jobs", icon: <Navigation size={18} /> },
    { path: "/oem", label: "OEM Admin", icon: <Box size={18} /> },
    { path: "/ai", label: "BluFleet AI", icon: <Brain size={18} /> },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: C.navy, color: C.white, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: `1px solid ${C.borderDark}` }}>
          <h1 style={{ fontFamily: FONT.condensed, fontSize: "24px", fontWeight: 800, color: C.orangeLight }}>BluMotiv Admin</h1>
          <div style={{ fontSize: "12px", color: C.slateLight, marginTop: "4px" }}>Platform Operations</div>
        </div>
        
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path} style={{
                display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: R.md,
                background: isActive ? C.navyLight : "transparent",
                color: isActive ? C.white : C.slateLight,
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s"
              }}>
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: `1px solid ${C.borderDark}` }}>
          <button style={{
            display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", width: "100%",
            color: C.slateLight, fontWeight: 500, transition: "color 0.2s"
          }}>
            <Settings size={18} /> Settings
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", width: "100%",
            color: C.red, fontWeight: 500, marginTop: "4px"
          }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, background: C.offWhite, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <header style={{ height: "64px", background: C.white, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: C.navy }}>Super Admin</div>
              <div style={{ fontSize: "11px", color: C.slate }}>admin@blumotiv.com</div>
            </div>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: C.orange, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              SA
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div style={{ padding: "24px", flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
