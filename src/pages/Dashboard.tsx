import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { kpiData, funnelData, abTestData, recentActivity, simulateDelay } from "@/lib/mock-data";
import { Mail, Eye, MessageSquare, ThumbsUp, PhoneCall, DollarSign, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const icons = [Mail, Eye, MessageSquare, ThumbsUp, PhoneCall, DollarSign];

function formatValue(val: number, prefix: string, suffix: string) {
  if (prefix === "$") return `$${(val / 1000000).toFixed(2)}M`;
  if (val > 999) return val.toLocaleString();
  return `${val}${suffix}`;
}

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const dur = 1500;
    const step = end / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); return; }
      setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{formatValue(display, prefix, suffix)}</span>;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { simulateDelay(1000).then(() => setLoading(false)); }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-6"><Skeleton className="h-20" /></CardContent></Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card><CardContent className="p-6"><Skeleton className="h-64" /></CardContent></Card>
          <Card><CardContent className="p-6"><Skeleton className="h-64" /></CardContent></Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = icons[i];
          const positive = kpi.change > 0;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground font-medium">{kpi.label}</span>
                    <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                      <Icon className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">
                    <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {positive ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    <span className={`text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>{positive ? "+" : ""}{kpi.change}%</span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Funnel */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Sales Funnel</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnelData.map((stage, i) => {
                const pct = Math.round((stage.value / funnelData[0].value) * 100);
                return (
                  <div key={stage.stage} className="flex items-center gap-3">
                    <span className="text-xs font-medium w-16 text-muted-foreground">{stage.stage}</span>
                    <div className="flex-1">
                      <Progress value={pct} className="h-6 rounded-md" />
                    </div>
                    <span className="text-xs font-semibold w-16 text-right">{stage.value.toLocaleString()}</span>
                    {i < funnelData.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0 hidden sm:block" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* A/B Test */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">A/B Campaign Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={abTestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="campaignA" name="Campaign A" fill={"hsl(var(--primary-dark))"} radius={[4, 4, 0, 0]} />
                <Bar dataKey="campaignB" name="Campaign B" fill={"hsl(var(--primary-light))"} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Deliverability + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Deliverability Health</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold text-success">97.2%</span>
              <Badge variant="outline" className="text-success border-success/30">Excellent</Badge>
            </div>
            <Progress value={97.2} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">Bounce rate: 1.8% · Spam complaints: 0.02%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {recentActivity.map(item => (
                <div key={item.id} className="flex items-start gap-2">
                  <div className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${
                    item.type === "positive" ? "bg-success" : item.type === "success" ? "bg-primary" : item.type === "warning" ? "bg-warning" : "bg-info"
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium">{item.action}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-auto">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
