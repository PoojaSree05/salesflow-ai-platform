import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, FileText, Shield, Upload } from "lucide-react";

const assets = [
  { name: "Enterprise Case Study — Stripe", type: "PDF", size: "2.4 MB" },
  { name: "Product Pitch Deck v3", type: "PPTX", size: "8.1 MB" },
  { name: "Pricing Sheet 2026", type: "PDF", size: "1.2 MB" },
  { name: "FAQ — Security & Compliance", type: "DOCX", size: "340 KB" },
];

const Workspace = () => {
  const [tone, setTone] = useState("formal");
  const [gdpr, setGdpr] = useState(true);
  const [autoUnsub, setAutoUnsub] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Workspace settings saved successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Company Profile */}
      <Card>
        <CardHeader><CardTitle className="text-base">Company Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1.5 block">Company Name</label><Input defaultValue="Acme Corp" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Website</label><Input defaultValue="https://acmecorp.com" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Industry</label><Input defaultValue="B2B SaaS" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Team Size</label><Input defaultValue="45" type="number" /></div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Kit */}
      <Card>
        <CardHeader><CardTitle className="text-base">Brand Kit</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Communication Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="assertive">Assertive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><label className="text-sm font-medium mb-1.5 block">Value Propositions</label><Textarea defaultValue="AI-powered sales automation that triples pipeline velocity.\nMultichannel outreach with intelligent personalization.\nEnterprise-grade compliance and deliverability." rows={3} /></div>
          <div><label className="text-sm font-medium mb-1.5 block">Competitor Notes</label><Textarea defaultValue="Outreach.io — strong but expensive.\nSalesloft — good UI, lacks AI classification.\nApollo — data quality concerns." rows={3} /></div>
        </CardContent>
      </Card>

      {/* Asset Library */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Asset Library</CardTitle>
          <Button variant="outline" size="sm"><Upload className="h-3.5 w-3.5 mr-1" /> Upload</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {assets.map(a => (
              <div key={a.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/50 hover:bg-muted transition">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium flex-1">{a.name}</span>
                <Badge variant="secondary" className="text-[10px]">{a.type}</Badge>
                <span className="text-xs text-muted-foreground">{a.size}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Compliance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">GDPR Mode</p><p className="text-xs text-muted-foreground">Enforce data processing consent requirements</p></div>
            <Switch checked={gdpr} onCheckedChange={setGdpr} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Auto Unsubscribe</p><p className="text-xs text-muted-foreground">Automatically honor unsubscribe requests</p></div>
            <Switch checked={autoUnsub} onCheckedChange={setAutoUnsub} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Suppression List Preview</p>
            <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground space-y-1">
              <p>lisa.thompson@twilio.com — Unsubscribed 2/12/2026</p>
              <p>no-reply@competitor.com — Bounced 2/10/2026</p>
              <p>spam-trap@example.com — Blacklisted 2/08/2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="gap-2">
        <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Workspace"}
      </Button>
    </div>
  );
};

export default Workspace;
