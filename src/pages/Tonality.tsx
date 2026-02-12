import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { tonalityProfile, simulateDelay } from "@/lib/mock-data";
import { toast } from "sonner";
import { Upload, Sparkles, AlertTriangle, Mail, Eye } from "lucide-react";

const Tonality = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [approved, setApproved] = useState(tonalityProfile.approvedClaims);

  const handleGenerate = async () => {
    setLoading(true);
    await simulateDelay(1500);
    setGenerated(true);
    setLoading(false);
    toast.success("Tonality profile generated");
  };

  const previewEmail = `Hi Sarah,

I noticed Stripe's engineering team has been scaling rapidly — congrats on the momentum.

We've been helping companies like Datadog and Snowflake automate their outbound sales pipeline, resulting in a 3.2x increase in qualified meetings.

Would it make sense to explore how SalesFlow AI could support your team's growth goals? Happy to share a quick case study.

Best regards,
Alex Rivera
SalesFlow AI`;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Upload */}
      <Card>
        <CardHeader><CardTitle className="text-base">Analyze Your Writing Style</CardTitle></CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium">Upload past emails for analysis</p>
            <p className="text-xs text-muted-foreground mt-1">Supports .eml, .txt, .csv formats</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleGenerate}>
              <Sparkles className="h-3.5 w-3.5 mr-1" /> {loading ? "Analyzing..." : "Generate Tonality Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      {(generated || !loading) && (
        <Card>
          <CardHeader><CardTitle className="text-base">Tonality Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8" />)}</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Greeting Style</p>
                    <p className="text-sm font-medium">{tonalityProfile.greetingStyle}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Sentence Length</p>
                    <p className="text-sm font-medium">{tonalityProfile.sentenceLength}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">CTA Pattern</p>
                    <p className="text-sm font-medium">{tonalityProfile.ctaPattern}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Formality Level</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={tonalityProfile.formalityLevel} className="h-2 flex-1" />
                      <span className="text-sm font-semibold">{tonalityProfile.formalityLevel}%</span>
                    </div>
                  </div>
                </div>

                {/* Risk words */}
                <div className="flex items-center gap-2 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Risk Words Detected</p>
                    <div className="flex gap-1.5 mt-1">
                      {tonalityProfile.riskWords.map(w => (
                        <Badge key={w} variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">{w}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Approved Claims Only</p><p className="text-xs text-muted-foreground">Restrict emails to verified claims</p></div>
                  <Switch checked={approved} onCheckedChange={setApproved} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Eye className="h-4 w-4" /> Email Preview</CardTitle></CardHeader>
        <CardContent>
          <div className="bg-muted/30 border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Subject: Scaling Outbound at Stripe</span>
            </div>
            <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed text-foreground">{previewEmail}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tonality;
