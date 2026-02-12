import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Campaign, CampaignStep, CampaignStatus } from "@/lib/mock-data";
import { campaignsData, simulateDelay } from "@/lib/mock-data";
import { toast } from "sonner";
import { Plus, Play, Pause, Mail, Linkedin, Trash2, GripVertical, Clock } from "lucide-react";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Draft: "bg-muted text-muted-foreground",
  Paused: "bg-warning/10 text-warning border-warning/20",
};

const stepIcons: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  linkedin_connect: <Linkedin className="h-4 w-4" />,
  linkedin_followup: <Linkedin className="h-4 w-4" />,
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignsData);
  const [selected, setSelected] = useState(0);
  const [throttle, setThrottle] = useState([150]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const campaign = campaigns[selected];

  const startCampaign = async () => {
    setRunning(true);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(i);
    }
    setRunning(false);
    toast.success(`Campaign "${campaign.name}" launched!`);
    setCampaigns(prev => prev.map((c, i) => i === selected ? { ...c, status: "Active" as CampaignStatus } : c));
  };

  const addStep = () => {
    setCampaigns(prev => prev.map((c, i) => i === selected ? {
      ...c,
      steps: [...c.steps, { type: "email" as const, subject: "New follow-up email", delay: 3 }]
    } : c));
  };

  const removeStep = (stepIdx: number) => {
    setCampaigns(prev => prev.map((c, i) => i === selected ? {
      ...c,
      steps: c.steps.filter((_, si) => si !== stepIdx)
    } : c));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Campaign list */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {campaigns.map((c, i) => (
          <Card
            key={c.id}
            className={`shrink-0 cursor-pointer transition-all min-w-[220px] ${i === selected ? "ring-2 ring-primary" : "hover:shadow-md"}`}
            onClick={() => setSelected(i)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className={statusColors[c.status]}>{c.status}</Badge>
                <span className="text-xs text-muted-foreground">{c.steps.length} steps</span>
              </div>
              <p className="font-medium text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.contacts.toLocaleString()} contacts · {c.replied} replies</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sequence Builder */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Sequence Builder — {campaign.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addStep}><Plus className="h-3.5 w-3.5 mr-1" /> Add Step</Button>
            {campaign.status !== "Active" && (
              <Button size="sm" onClick={startCampaign} disabled={running}><Play className="h-3.5 w-3.5 mr-1" /> Start</Button>
            )}
            {campaign.status === "Active" && (
              <Button size="sm" variant="outline" onClick={() => {
                setCampaigns(prev => prev.map((c, i) => i === selected ? { ...c, status: "Paused" as CampaignStatus } : c));
                toast.info("Campaign paused");
              }}><Pause className="h-3.5 w-3.5 mr-1" /> Pause</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaign.steps.map((step, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: si * 0.05 }}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg group"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  {stepIcons[step.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{step.subject}</p>
                  <p className="text-xs text-muted-foreground capitalize">{step.type.replace(/_/g, " ")}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Day {step.delay}
                </div>
                <button onClick={() => removeStep(si)} className="opacity-0 group-hover:opacity-100 transition text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {running && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Launching campaign...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Throttle */}
      <Card>
        <CardHeader><CardTitle className="text-base">Delivery Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-3 block">Throttle: {throttle[0]} emails/day</label>
            <Slider min={10} max={500} step={10} value={throttle} onValueChange={setThrottle} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Time Delay Between Emails</label>
              <Select defaultValue="60">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Send Window</label>
              <Select defaultValue="business">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business Hours (9-5)</SelectItem>
                  <SelectItem value="extended">Extended (8-8)</SelectItem>
                  <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;
