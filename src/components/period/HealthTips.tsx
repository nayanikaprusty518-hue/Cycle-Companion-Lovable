import { HEALTH_TIPS } from "@/lib/period-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export function HealthTips() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {HEALTH_TIPS.map((t) => (
        <Card key={t.title} className="border-0 shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
