import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Workspace from "@/pages/Workspace";
import ICPLeads from "@/pages/ICPLeads";
import Tonality from "@/pages/Tonality";
import Campaigns from "@/pages/Campaigns";
import InboxPage from "@/pages/InboxPage";
import CallsPPT from "@/pages/CallsPPT";
import CalendarPage from "@/pages/CalendarPage";
import Analytics from "@/pages/Analytics";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/icp-leads" element={<ICPLeads />} />
              <Route path="/tonality" element={<Tonality />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/calls" element={<CallsPPT />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
