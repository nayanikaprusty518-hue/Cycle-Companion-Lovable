import { CycleEntry, formatDate, nextPeriodDate, ovulationDate, daysUntil } from "@/lib/period-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarHeart, Sparkles, Droplets, ShieldCheck } from "lucide-react";

export function Dashboard({ entries }: { entries: CycleEntry[] }) {
  const latest = entries[0];

  const next = latest ? nextPeriodDate(latest) : null;
  const ovu = latest ? ovulationDate(latest) : null;
  const nextIn = next ? daysUntil(next) : null;
  const ovuIn = ovu ? daysUntil(ovu) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl p-6 md:p-8" style={{ background: "var(--gradient-soft)" }}>
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white/70 p-3">
            <CalendarHeart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1">
              Your private cycle insights — stored only on your device.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-medium">Next Period</CardTitle>
          </CardHeader>
          <CardContent>
            {next ? (
              <>
                <p className="text-3xl font-semibold text-foreground">{formatDate(next)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {nextIn !== null && nextIn >= 0 ? `In ${nextIn} day${nextIn === 1 ? "" : "s"}` : `${Math.abs(nextIn ?? 0)} days ago`}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Log your first entry to see predictions.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-xl bg-accent p-2.5">
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </div>
            <CardTitle className="text-base font-medium">Predicted Ovulation</CardTitle>
          </CardHeader>
          <CardContent>
            {ovu ? (
              <>
                <p className="text-3xl font-semibold text-foreground">{formatDate(ovu)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {ovuIn !== null && ovuIn >= 0 ? `In ${ovuIn} day${ovuIn === 1 ? "" : "s"}` : `${Math.abs(ovuIn ?? 0)} days ago`}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">No data yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-[var(--shadow-soft)] bg-secondary/40">
        <CardContent className="flex items-start gap-3 pt-6">
          <ShieldCheck className="h-5 w-5 text-secondary-foreground mt-0.5" />
          <p className="text-sm text-secondary-foreground">
            <strong>Privacy first.</strong> All cycle data is saved locally in your browser. Nothing is sent to a server.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
