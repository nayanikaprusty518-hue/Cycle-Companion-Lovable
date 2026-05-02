import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCase from "@/assets/diagram-usecase.png";
import classDiag from "@/assets/diagram-class.png";
import sequence from "@/assets/diagram-sequence.png";
import activity from "@/assets/diagram-activity.png";

const diagrams = [
  { title: "Use Case Diagram", src: useCase, alt: "Use case diagram for the period tracking system" },
  { title: "Class Diagram", src: classDiag, alt: "Class diagram showing OOP structure" },
  { title: "Sequence Diagram", src: sequence, alt: "Sequence diagram of user interactions" },
  { title: "Activity Diagram", src: activity, alt: "Activity diagram of app workflow" },
];

export function SystemDesign() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl p-6" style={{ background: "var(--gradient-soft)" }}>
        <h2 className="text-2xl font-semibold">System Design</h2>
        <p className="text-muted-foreground mt-1">
          UML diagrams documenting the architecture and behavior of the Period Tracking System.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {diagrams.map((d) => (
          <Card key={d.title} className="border-0 shadow-[var(--shadow-soft)] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">{d.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={d.src} alt={d.alt} loading="lazy" className="w-full h-auto rounded-xl border border-border" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
