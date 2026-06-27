import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FONT_IMPORT } from "./shared/tokens";
import { AppShell } from "./components/layout/AppShell";
import { DashboardScreen } from "./features/dashboard/DashboardScreen";
import { UsersScreen } from "./features/users/UsersScreen";
import { MarketplaceScreen } from "./features/marketplace/MarketplaceScreen";
import { FleetScreen } from "./features/fleet/FleetScreen";
import { FinanceScreen } from "./features/finance/FinanceScreen";
import { DisputesScreen } from "./features/disputes/DisputesScreen";
import { MaintenanceScreen } from "./features/maintenance/MaintenanceScreen";
import { TransportScreen } from "./features/transport/TransportScreen";
import { OEMScreen } from "./features/oem/OEMScreen";
import { AIScreen } from "./features/ai/AIScreen";
import { InvestmentScreen } from './features/investment/InvestmentScreen';

let injected = false;
function injectGlobal() {
  if (injected) return;
  const style = document.createElement("style");
  style.textContent = FONT_IMPORT;
  document.head.appendChild(style);
  injected = true;
}

export const App: React.FC = () => {
  useEffect(() => {
    injectGlobal();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/marketplace" element={<MarketplaceScreen />} />
          <Route path="/fleet" element={<FleetScreen />} />
          <Route path="/finance" element={<FinanceScreen />} />
          <Route path="/disputes" element={<DisputesScreen />} />
          <Route path="/maintenance" element={<MaintenanceScreen />} />
          <Route path="/transport" element={<TransportScreen />} />
          <Route path="/oem" element={<OEMScreen />} />
          <Route path="/ai" element={<AIScreen />} />
          <Route path="/investment" element={<InvestmentScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
