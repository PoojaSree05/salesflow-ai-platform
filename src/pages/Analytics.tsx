import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { funnelData, channelPerformance, revenueData, abTestData, auditLog, simulateDelay } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area, Cell, LabelList } from "recharts";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { simulateDelay(1000).then(() => setLoading(false)); }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}><CardContent className="p-6"><Skeleton className="h-48" /></CardContent></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Funnel */}
        <Card>
          <CardHeader><CardTitle className="text-base">Funnel Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.9)" />
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="stage" type="category" fontSize={11} width={60} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v:number)=>v.toLocaleString()} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18} animationDuration={900} animationEasing="ease-out">
                  {funnelData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="right" formatter={(v: number) => v.toLocaleString()} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Pipeline */}
        <Card>
          <CardHeader><CardTitle className="text-base">Revenue Pipeline</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="primaryArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(var(--primary-light))" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.9)" />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} tickFormatter={v => `$${v / 1000}K`} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`, "Pipeline"]} />
                <Area type="monotone" dataKey="value" stroke={"hsl(var(--primary-dark))"} fill="url(#primaryArea)" fillOpacity={1} strokeWidth={2} animationDuration={1100} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader><CardTitle className="text-base">Channel Performance</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Sent</TableHead>
                  <TableHead className="text-right">Opened</TableHead>
                  <TableHead className="text-right">Replied</TableHead>
                  <TableHead className="text-right">Converted</TableHead>
                  <TableHead className="text-right">Conv. Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channelPerformance.map(ch => (
                  <TableRow key={ch.channel}>
                    <TableCell className="font-medium">{ch.channel}</TableCell>
                    <TableCell className="text-right">{ch.sent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{ch.opened.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{ch.replied.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{ch.converted.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {((ch.converted / ch.sent) * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* A/B */}
        <Card>
          <CardHeader><CardTitle className="text-base">A vs B Conversion</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={abTestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="campaignA" name="Sequence A" stroke={"hsl(var(--primary-dark))"} strokeWidth={2} dot={false} activeDot={{ r: 5 }} strokeLinecap="round" animationDuration={900} />
                <Line type="monotone" dataKey="campaignB" name="Sequence B" stroke={"hsl(var(--primary-light))"} strokeWidth={2} dot={false} activeDot={{ r: 5 }} strokeLinecap="round" animationDuration={900} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deliverability */}
        <Card>
          <CardHeader><CardTitle className="text-base">Deliverability Health</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="text-5xl font-bold text-success mb-2">97.2%</div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 mb-4">Excellent</Badge>
            <Progress value={97.2} className="h-3 w-full max-w-xs" />
            <p className="text-xs text-muted-foreground mt-3">Bounce: 1.8% · Spam: 0.02% · Blacklists: 0</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader><CardTitle className="text-base">Audit Log</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden sm:table-cell">Timestamp</TableHead>
                <TableHead className="hidden md:table-cell">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLog.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-xs">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
