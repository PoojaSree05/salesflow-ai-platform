import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Building2, Users, Mic2, Send, Inbox, Phone, Calendar, BarChart3, Settings, Zap, ChevronLeft, ChevronDown, LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Workspace", path: "/workspace", icon: Building2 },
  { label: "ICP & Leads", path: "/icp-leads", icon: Users },
  { label: "Tonality Engine", path: "/tonality", icon: Mic2 },
  { label: "Campaigns", path: "/campaigns", icon: Send },
  { label: "Inbox", path: "/inbox", icon: Inbox },
  { label: "Calls & PPT", path: "/calls", icon: Phone },
  { label: "Calendar", path: "/calendar", icon: Calendar },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
];

const AppSidebar: React.FC<{ collapsed: boolean; onToggle: () => void; onClose?: () => void }> = ({ collapsed, onToggle, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [wsOpen, setWsOpen] = useState(false);

  return (
    <aside className={cn(
      "h-screen flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 shrink-0",
      collapsed ? "w-[60px]" : "w-[240px]"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 h-14 border-b border-sidebar-border shrink-0">
        <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <Zap className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && <span className="font-bold text-sm text-sidebar-accent-foreground tracking-tight">SalesFlow AI</span>}
        <button onClick={onToggle} className="ml-auto text-sidebar-muted hover:text-sidebar-accent-foreground transition hidden md:block">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Workspace switcher */}
      {!collapsed && (
        <button onClick={() => setWsOpen(!wsOpen)} className="mx-3 mt-3 flex items-center gap-2 px-2 py-1.5 rounded-md bg-sidebar-accent text-sidebar-accent-foreground text-xs hover:bg-sidebar-accent/80 transition">
          <Building2 className="h-3.5 w-3.5" />
          <span className="truncate flex-1 text-left">Acme Corp</span>
          <ChevronDown className={cn("h-3 w-3 transition-transform", wsOpen && "rotate-180")} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto mt-3 px-2 space-y-0.5">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all",
                active ? "bg-sidebar-primary/15 text-sidebar-primary sidebar-glow" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-2 pb-1">
        <NavLink
          to="/settings"
          onClick={onClose}
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all",
            location.pathname === "/settings" ? "bg-sidebar-primary/15 text-sidebar-primary sidebar-glow" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      {/* User */}
      <div className="border-t border-sidebar-border px-3 py-3 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground shrink-0">
          {user?.avatar || "U"}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-accent-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-sidebar-muted truncate">{user?.role}</p>
          </div>
        )}
        {!collapsed && (
          <button onClick={logout} className="text-sidebar-muted hover:text-destructive transition" title="Logout">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
