import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leadsData } from "@/lib/mock-data";
import { toast } from "sonner";
import { Upload, Search, Users, Target } from "lucide-react";

const statusColors: Record<string, string> = {
  New: "bg-info/10 text-info border-info/20",
  Contacted: "bg-warning/10 text-warning border-warning/20",
  Replied: "bg-primary/10 text-primary border-primary/20",
  Qualified: "bg-success/10 text-success border-success/20",
};

const techOptions = ["Salesforce", "HubSpot", "Outreach", "Marketo", "Drift", "Gong", "ZoomInfo"];

const ICPLeads = () => {
  const [companySize, setCompanySize] = useState([200, 2000]);
  const [selectedLead, setSelectedLead] = useState<typeof leadsData[0] | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>(["Salesforce", "HubSpot"]);

  const marketSize = Math.round((companySize[1] - companySize[0]) * 7.1);
  const filtered = leadsData.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ICP Builder */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4" /> ICP Builder</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Industry</label>
              <Select defaultValue="saas">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">B2B SaaS</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="data">Data & Analytics</SelectItem>
                  <SelectItem value="security">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Region</label>
              <Select defaultValue="na">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="na">North America</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="apac">Asia-Pacific</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-3 block">Company Size: {companySize[0]} – {companySize[1]} employees</label>
              <Slider min={10} max={10000} step={10} value={companySize} onValueChange={setCompanySize} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Tech Stack</label>
              <div className="flex flex-wrap gap-2">
                {techOptions.map(t => (
                  <Badge
                    key={t}
                    variant={selectedTech.includes(t) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTech(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                  >{t}</Badge>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Intent Signals</label>
              <div className="flex flex-wrap gap-4">
                {["Hiring SDRs", "Evaluating tools", "Funding round", "Job postings", "Tech adoption"].map(s => (
                  <label key={s} className="flex items-center gap-2 text-sm">
                    <Checkbox defaultChecked={s === "Hiring SDRs" || s === "Evaluating tools"} />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-accent rounded-lg flex items-center gap-2">
            <Users className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Estimated Market Size: {marketSize.toLocaleString()} companies</span>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Leads ({filtered.length})</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success("3 duplicates removed", { description: "Deduplication complete" })}>
              <Upload className="h-3.5 w-3.5 mr-1" /> Import CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.info("CRM sync initiated")}>Import CRM</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="hidden sm:table-cell">Title</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(lead => (
                <TableRow key={lead.id} className="cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">{lead.title}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-semibold ${lead.score >= 85 ? "text-success" : lead.score >= 70 ? "text-warning" : "text-muted-foreground"}`}>{lead.score}</span>
                  </TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[lead.status]}>{lead.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Lead Detail Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selectedLead?.name}</DialogTitle></DialogHeader>
          {selectedLead && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Company</span><p className="font-medium">{selectedLead.company}</p></div>
                <div><span className="text-muted-foreground">Title</span><p className="font-medium">{selectedLead.title}</p></div>
                <div><span className="text-muted-foreground">Email</span><p className="font-medium">{selectedLead.email}</p></div>
                <div><span className="text-muted-foreground">Industry</span><p className="font-medium">{selectedLead.industry}</p></div>
                <div><span className="text-muted-foreground">Quality Score</span><p className="font-semibold text-lg">{selectedLead.score}/100</p></div>
                <div><span className="text-muted-foreground">Status</span><Badge variant="outline" className={statusColors[selectedLead.status]}>{selectedLead.status}</Badge></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ICPLeads;
