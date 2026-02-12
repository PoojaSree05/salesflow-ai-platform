import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { inboxData } from "@/lib/mock-data";
import { toast } from "sonner";
import { PhoneCall, Ban, Clock, ThumbsUp, Minus, AlertTriangle, Mail } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Positive: { color: "bg-success/10 text-success border-success/20", icon: <ThumbsUp className="h-3 w-3" /> },
  Neutral: { color: "bg-muted text-muted-foreground", icon: <Minus className="h-3 w-3" /> },
  Objection: { color: "bg-warning/10 text-warning border-warning/20", icon: <AlertTriangle className="h-3 w-3" /> },
  Unsubscribe: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: <Ban className="h-3 w-3" /> },
  OOO: { color: "bg-info/10 text-info border-info/20", icon: <Clock className="h-3 w-3" /> },
};

const InboxPage = () => {
  const [selected, setSelected] = useState<typeof inboxData[0] | null>(null);

  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4" /> Inbox ({inboxData.length} replies)</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {inboxData.map(msg => {
              const cfg = statusConfig[msg.status];
              return (
                <div key={msg.id} onClick={() => setSelected(msg)} className="flex items-start gap-3 px-5 py-4 hover:bg-muted/30 cursor-pointer transition">
                  <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
                    {msg.from.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium">{msg.from}</span>
                      <span className="text-xs text-muted-foreground">— {msg.company}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto shrink-0">{msg.time}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground/80 truncate">{msg.subject}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.preview}</p>
                  </div>
                  <Badge variant="outline" className={`shrink-0 ${cfg.color} gap-1`}>{cfg.icon} {msg.status}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detail drawer */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="w-[400px] sm:w-[440px]">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.from} — {selected.company}</SheetTitle>
              </SheetHeader>
              <div className="space-y-5 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <p className="text-sm font-medium">{selected.subject}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">{selected.preview}</p>
                </div>
                <div>
                  <Badge variant="outline" className={`${statusConfig[selected.status].color} gap-1`}>
                    {statusConfig[selected.status].icon} {selected.status}
                  </Badge>
                </div>

                {selected.painPoints.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Extracted Pain Points</p>
                    <ul className="space-y-1">
                      {selected.painPoints.map(p => (
                        <li key={p} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 bg-primary rounded-full" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-muted/50 rounded-lg">
                    <p className="text-[10px] text-muted-foreground">Budget Hint</p>
                    <p className="text-sm font-medium">{selected.budgetHint}</p>
                  </div>
                  <div className="p-2.5 bg-muted/50 rounded-lg">
                    <p className="text-[10px] text-muted-foreground">Timeline</p>
                    <p className="text-sm font-medium">{selected.timeline}</p>
                  </div>
                </div>

                {selected.stakeholders.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Stakeholders</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.stakeholders.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {selected.status === "Positive" && (
                    <Button className="flex-1 gap-1" onClick={() => { setSelected(null); toast.success("Moved to Call Workflow"); }}>
                      <PhoneCall className="h-4 w-4" /> Move to Call Workflow
                    </Button>
                  )}
                  {selected.status === "Unsubscribe" && (
                    <Button variant="destructive" className="flex-1 gap-1" onClick={() => { setSelected(null); toast.info("Added to suppression list"); }}>
                      <Ban className="h-4 w-4" /> Add to Suppression
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InboxPage;
