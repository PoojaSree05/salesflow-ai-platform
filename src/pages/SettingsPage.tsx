import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { integrations, teamMembers } from "@/lib/mock-data";
import { toast } from "sonner";
import { Link2, Users, Shield, Database } from "lucide-react";

const SettingsPage = () => {
  const [approvalWorkflow, setApprovalWorkflow] = useState(true);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Integrations */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Link2 className="h-4 w-4" /> Integrations</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {integrations.map(int => (
              <div key={int.name} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{int.icon}</span>
                  <span className="font-medium text-sm">{int.name}</span>
                </div>
                <Badge variant={int.status === "Connected" ? "default" : "secondary"} className="mb-2">
                  {int.status}
                </Badge>
                <p className="text-xs text-muted-foreground">Last sync: {int.lastSync}</p>
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => toast.info(`${int.name} ${int.status === "Connected" ? "disconnected" : "connected"}`)}>
                  {int.status === "Connected" ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Team & Roles</CardTitle>
          <Button size="sm" variant="outline" onClick={() => toast.success("Invitation sent")}>Invite Member</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map(m => (
                <TableRow key={m.email}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground">{m.email}</TableCell>
                  <TableCell><Badge variant="secondary">{m.role}</Badge></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={m.status === "Active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                      {m.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Workflow & Compliance */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Workflow & Compliance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Approval Workflow</p>
              <p className="text-xs text-muted-foreground">Require manager approval before launching campaigns</p>
            </div>
            <Switch checked={approvalWorkflow} onCheckedChange={setApprovalWorkflow} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Data Retention Period</label>
            <Select defaultValue="12">
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
                <SelectItem value="36">36 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Log */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Database className="h-4 w-4" /> Compliance Log</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {[
              { action: "GDPR consent recorded", user: "System", time: "2026-02-12 09:00" },
              { action: "Suppression list updated (+3 entries)", user: "System", time: "2026-02-12 08:30" },
              { action: "Data retention policy applied", user: "Alex Rivera", time: "2026-02-11 17:00" },
              { action: "Unsubscribe request processed", user: "System", time: "2026-02-11 14:20" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                <span className="text-muted-foreground text-xs w-36 shrink-0">{l.time}</span>
                <span className="flex-1">{l.action}</span>
                <Badge variant="secondary" className="text-[10px]">{l.user}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
