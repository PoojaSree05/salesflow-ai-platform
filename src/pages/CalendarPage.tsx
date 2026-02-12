import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { timeSlots, simulateDelay } from "@/lib/mock-data";
import { toast } from "sonner";
import { Calendar as CalIcon, Clock, CheckCircle2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CalendarPage = () => {
  const [slots, setSlots] = useState(timeSlots);
  const [bookingSlot, setBookingSlot] = useState<typeof timeSlots[0] | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const dates = [...new Set(slots.map(s => s.date))];

  const handleBook = async () => {
    if (!bookingSlot) return;
    setLoading(true);
    await simulateDelay(1200);
    setSlots(prev => prev.map(s => s.id === bookingSlot.id ? { ...s, available: false, booked: "New Meeting" } : s));
    setLoading(false);
    setConfirmed(true);
    toast.success("Meeting booked successfully!");
  };

  const handoff = {
    painPoints: ["Manual outbound inefficiency", "Low reply rates", "Tool fragmentation"],
    timeline: "Q1 2026 — Decision by March",
    assetsShared: ["Enterprise Case Study", "Pricing Sheet 2026", "Product Demo Recording"],
    objections: ["Integration concern with Salesforce", "Budget review pending CFO approval"],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Time Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dates.map(date => (
          <Card key={date}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CalIcon className="h-4 w-4" /> {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {slots.filter(s => s.date === date).map(slot => (
                  <div key={slot.id} className={`flex items-center gap-3 p-3 rounded-lg transition ${slot.available ? "bg-muted/30 hover:bg-accent cursor-pointer" : "bg-muted/50 opacity-60"}`}
                    onClick={() => slot.available && setBookingSlot(slot)}>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{slot.time}</span>
                    {slot.available ? (
                      <Badge variant="outline" className="ml-auto bg-success/10 text-success border-success/20">Available</Badge>
                    ) : (
                      <span className="ml-auto text-xs text-muted-foreground">{slot.booked}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      <Dialog open={!!bookingSlot} onOpenChange={() => { setBookingSlot(null); setConfirmed(false); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Book Meeting</DialogTitle></DialogHeader>
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="bg-accent rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Selected Slot</p>
                  <p className="text-lg font-semibold">{bookingSlot?.date} — {bookingSlot?.time}</p>
                </div>
                <Button className="w-full" onClick={handleBook} disabled={loading}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-3">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <p className="font-semibold">Meeting Confirmed!</p>
                <p className="text-sm text-muted-foreground">{bookingSlot?.date} at {bookingSlot?.time}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Handoff Summary */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Handoff Summary</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Pain Points</p>
              <ul className="space-y-1">{handoff.painPoints.map(p => <li key={p} className="text-sm flex items-center gap-2"><span className="h-1.5 w-1.5 bg-destructive rounded-full" />{p}</li>)}</ul>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Timeline</p>
              <p className="text-sm">{handoff.timeline}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Assets Shared</p>
              <ul className="space-y-1">{handoff.assetsShared.map(a => <li key={a} className="text-sm flex items-center gap-2"><FileText className="h-3 w-3 text-muted-foreground" />{a}</li>)}</ul>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Objections</p>
              <ul className="space-y-1">{handoff.objections.map(o => <li key={o} className="text-sm flex items-center gap-2"><span className="h-1.5 w-1.5 bg-warning rounded-full" />{o}</li>)}</ul>
            </div>
          </div>
          <Button variant="outline" className="gap-1" onClick={() => toast.success("Opportunity card created")}>
            <CheckCircle2 className="h-4 w-4" /> Create Opportunity Card
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
