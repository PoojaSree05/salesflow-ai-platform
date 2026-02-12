import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { simulateDelay } from "@/lib/mock-data";
import { Phone, Sparkles, Download, Presentation, FileText, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CallsPPT = () => {
  const [budget, setBudget] = useState("$50K-100K annually");
  const [authority, setAuthority] = useState("VP Engineering + CTO (joint decision)");
  const [need, setNeed] = useState("Automating outbound sales workflow, reducing manual prospecting time by 60%");
  const [timeline, setTimeline] = useState("Q1 2026 — evaluating vendors now");
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [pptGenerated, setPptGenerated] = useState(false);
  const [pptLoading, setPptLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const generateSummary = async () => {
    setLoadingSummary(true);
    await simulateDelay(1500);
    setAiSummary(`**Call Summary — Stripe**\n\n• Budget confirmed at $50K-100K range, approved by CTO\n• Primary need: Replace fragmented outbound tools with unified AI platform\n• Timeline: Vendor shortlist by end of February, decision by March\n• Key stakeholders: VP Engineering (champion), CTO (decision maker), CFO (budget approval)\n• Objection: Concerned about integration with existing Salesforce instance\n• Next step: Schedule technical demo with engineering team`);
    setLoadingSummary(false);
    toast.success("AI summary generated");
  };

  const generatePPT = async () => {
    setPptLoading(true);
    await simulateDelay(2000);
    setPptGenerated(true);
    setPptLoading(false);
    toast.success("Presentation generated");
  };

  const handleDownload = async () => {
    setDownloading(true);
    await simulateDelay(1500);
    setDownloading(false);
    toast.success("Presentation downloaded");
  };

  const slides = [
    { title: "Executive Summary", desc: "SalesFlow AI value proposition tailored to Stripe" },
    { title: "Problem Statement", desc: "Manual outbound challenges & tool fragmentation" },
    { title: "Solution Overview", desc: "AI-powered multichannel automation platform" },
    { title: "Case Study: Datadog", desc: "3.2x pipeline growth in 90 days" },
    { title: "ROI Projection", desc: "Estimated $340K annual savings" },
    { title: "Implementation Timeline", desc: "4-week onboarding & integration plan" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="calls">
        <TabsList>
          <TabsTrigger value="calls" className="gap-1"><Phone className="h-3.5 w-3.5" /> Call Workflow</TabsTrigger>
          <TabsTrigger value="ppt" className="gap-1"><Presentation className="h-3.5 w-3.5" /> Auto PPT</TabsTrigger>
        </TabsList>

        <TabsContent value="calls" className="space-y-4 mt-4">
          {/* BANT */}
          <Card>
            <CardHeader><CardTitle className="text-base">BANT Qualification — Stripe</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-1.5 block">💰 Budget</label><Input value={budget} onChange={e => setBudget(e.target.value)} /></div>
                <div><label className="text-sm font-medium mb-1.5 block">👤 Authority</label><Input value={authority} onChange={e => setAuthority(e.target.value)} /></div>
                <div><label className="text-sm font-medium mb-1.5 block">🎯 Need</label><Textarea value={need} onChange={e => setNeed(e.target.value)} rows={2} /></div>
                <div><label className="text-sm font-medium mb-1.5 block">⏰ Timeline</label><Input value={timeline} onChange={e => setTimeline(e.target.value)} /></div>
              </div>
              <div className="flex gap-2">
                <Button onClick={generateSummary} disabled={loadingSummary} className="gap-1">
                  <Sparkles className="h-4 w-4" /> {loadingSummary ? "Generating..." : "Generate AI Summary"}
                </Button>
                <Button variant="outline" onClick={() => toast.success("Logged to CRM")} className="gap-1">
                  <FileText className="h-4 w-4" /> Log to CRM
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Summary */}
          {(loadingSummary || aiSummary) && (
            <Card>
              <CardHeader><CardTitle className="text-base">AI Summary</CardTitle></CardHeader>
              <CardContent>
                {loadingSummary ? (
                  <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-4" />)}</div>
                ) : (
                  <div className="bg-accent/50 rounded-lg p-4 text-sm whitespace-pre-wrap leading-relaxed">{aiSummary}</div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recommended Action */}
          <Card>
            <CardHeader><CardTitle className="text-base">Recommended Next Action</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium">Schedule Technical Demo</p>
                  <p className="text-xs text-muted-foreground">High BANT score (88/100) — recommend immediate follow-up with engineering stakeholders</p>
                </div>
                <Button size="sm" className="shrink-0 ml-auto">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ppt" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Auto Presentation Generator</CardTitle>
              <Button onClick={generatePPT} disabled={pptLoading} className="gap-1">
                <Sparkles className="h-4 w-4" /> {pptLoading ? "Generating..." : "Generate Deck"}
              </Button>
            </CardHeader>
            <CardContent>
              {pptLoading && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>}
              {pptGenerated && !pptLoading && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {slides.map((s, i) => (
                      <div key={i} className="border rounded-lg p-4 bg-gradient-to-br from-primary/5 to-accent/30 hover:shadow-md transition">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-[10px]">Slide {i + 1}</Badge>
                        </div>
                        <p className="text-sm font-semibold">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 gap-1" onClick={handleDownload} disabled={downloading}>
                    <Download className="h-4 w-4" /> {downloading ? "Downloading..." : "Download Presentation"}
                  </Button>
                </>
              )}
              {!pptGenerated && !pptLoading && (
                <div className="text-center py-8 text-muted-foreground">
                  <Presentation className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Click "Generate Deck" to create a tailored presentation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallsPPT;
