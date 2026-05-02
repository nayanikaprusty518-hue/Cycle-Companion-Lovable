import { useState } from "react";
import { CycleEntry } from "@/lib/period-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function LogEntryForm({ onAdd }: { onAdd: (e: CycleEntry) => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [cycleLength, setCycleLength] = useState(28);
  const [duration, setDuration] = useState(5);
  const [symptoms, setSymptoms] = useState("");
  const [mood, setMood] = useState("Calm");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || cycleLength < 15 || duration < 1) {
      toast.error("Please enter valid values");
      return;
    }
    onAdd({
      id: crypto.randomUUID(),
      date,
      cycleLength,
      duration,
      symptoms: symptoms.trim(),
      mood,
    });
    toast.success("Entry saved");
    setSymptoms("");
  };

  return (
    <Card className="border-0 shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle>Log Period Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Start Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cycle">Cycle Length (days)</Label>
            <Input id="cycle" type="number" min={15} max={45} value={cycleLength} onChange={(e) => setCycleLength(+e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dur">Duration (days)</Label>
            <Input id="dur" type="number" min={1} max={14} value={duration} onChange={(e) => setDuration(+e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Mood</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Calm", "Happy", "Tired", "Anxious", "Irritable", "Sad", "Energetic"].map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="sym">Symptoms</Label>
            <Textarea id="sym" placeholder="Cramps, headache, bloating..." value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full md:w-auto">Save Entry</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
