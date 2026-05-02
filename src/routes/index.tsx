import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CycleEntry, Storage } from "@/lib/period-tracker";
import { Dashboard } from "@/components/period/Dashboard";
import { LogEntryForm } from "@/components/period/LogEntryForm";
import { Reports } from "@/components/period/Reports";
import { HealthTips } from "@/components/period/HealthTips";
import { SystemDesign } from "@/components/period/SystemDesign";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { Flower2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bloom — Private Period & Cycle Tracker" },
      { name: "description", content: "Track your menstrual cycle, predict your next period and ovulation, and log symptoms — all stored privately on your device." },
    ],
  }),
});

function Index() {
  const [entries, setEntries] = useState<CycleEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(Storage.load().sort((a, b) => b.date.localeCompare(a.date)));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) Storage.save(entries);
  }, [entries, loaded]);

  const addEntry = (e: CycleEntry) =>
    setEntries((prev) => [e, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="rounded-2xl p-2" style={{ background: "var(--gradient-primary)" }}>
            <Flower2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Bloom</h1>
            <p className="text-xs text-muted-foreground">Private cycle tracking & wellness</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto h-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="log">Log Entry</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="tips">Health Tips</TabsTrigger>
            <TabsTrigger value="system">Developer</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard"><Dashboard entries={entries} /></TabsContent>
          <TabsContent value="log"><LogEntryForm onAdd={addEntry} /></TabsContent>
          <TabsContent value="reports"><Reports entries={entries} onDelete={removeEntry} /></TabsContent>
          <TabsContent value="tips"><HealthTips /></TabsContent>
          <TabsContent value="system"><SystemDesign /></TabsContent>
        </Tabs>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 text-center text-xs text-muted-foreground">
        Your data never leaves this device. Built with care for your privacy.
      </footer>
    </div>
  );
}
