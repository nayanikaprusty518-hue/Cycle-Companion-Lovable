import { CycleEntry, formatDate } from "@/lib/period-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, FileText } from "lucide-react";

export function Reports({ entries, onDelete }: { entries: CycleEntry[]; onDelete: (id: string) => void }) {
  return (
    <Card className="border-0 shadow-[var(--shadow-soft)]">
      <CardHeader className="flex flex-row items-center gap-3">
        <FileText className="h-5 w-5 text-primary" />
        <CardTitle>Cycle History</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-sm">No entries yet. Log your first period to see your history here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="py-3 px-2 font-medium text-muted-foreground">Start Date</th>
                  <th className="py-3 px-2 font-medium text-muted-foreground">Cycle</th>
                  <th className="py-3 px-2 font-medium text-muted-foreground">Duration</th>
                  <th className="py-3 px-2 font-medium text-muted-foreground">Mood</th>
                  <th className="py-3 px-2 font-medium text-muted-foreground">Symptoms</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b border-border/60">
                    <td className="py-3 px-2">{formatDate(e.date)}</td>
                    <td className="py-3 px-2">{e.cycleLength}d</td>
                    <td className="py-3 px-2">{e.duration}d</td>
                    <td className="py-3 px-2">{e.mood}</td>
                    <td className="py-3 px-2 text-muted-foreground">{e.symptoms || "—"}</td>
                    <td className="py-3 px-2 text-right">
                      <Button size="icon" variant="ghost" onClick={() => onDelete(e.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
