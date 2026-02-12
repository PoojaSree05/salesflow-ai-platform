import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, Plus, Menu } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/workspace": "Workspace Setup",
  "/icp-leads": "ICP & Leads",
  "/tonality": "Tonality Engine",
  "/campaigns": "Campaigns",
  "/inbox": "Inbox",
  "/calls": "Calls & PPT",
  "/calendar": "Calendar & Handoff",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

const AppHeader: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const location = useLocation();
  const { user } = useAuth();
  const title = pageTitles[location.pathname] || "SalesFlow AI";

  return (
    <header className="h-14 border-b flex items-center gap-4 px-4 lg:px-6 bg-card shrink-0">
      <button onClick={onMenuClick} className="md:hidden text-muted-foreground hover:text-foreground">
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="font-semibold text-lg hidden sm:block">{title}</h1>
      <div className="flex-1" />
      <div className="relative hidden md:block w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9 h-9 text-sm" />
      </div>
      <button className="relative text-muted-foreground hover:text-foreground transition">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
      </button>
      <Button size="sm" className="hidden sm:flex gap-1">
        <Plus className="h-4 w-4" /> New Campaign
      </Button>
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
        {user?.avatar || "U"}
      </div>
    </header>
  );
};

export default AppHeader;
