
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  change?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  change,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="w-4 h-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {typeof change !== "undefined" && (
          <div
            className={cn(
              "text-xs font-medium mt-2",
              change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-muted-foreground"
            )}
          >
            {change > 0 ? "+" : ""}
            {change}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}
