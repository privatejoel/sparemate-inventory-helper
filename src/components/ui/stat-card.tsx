
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  change?: number;
  className?: string;
  type?: 'default' | 'warning' | 'success' | 'danger';
}

export function StatCard({
  title,
  value,
  icon,
  description,
  change,
  className,
  type = 'default',
}: StatCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md",
      {
        "border-l-4 border-l-amber-500": type === 'warning',
        "border-l-4 border-l-green-500": type === 'success',
        "border-l-4 border-l-red-500": type === 'danger',
      },
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className={cn(
          "w-4 h-4", 
          {
            "text-amber-500": type === 'warning',
            "text-green-500": type === 'success',
            "text-red-500": type === 'danger',
            "text-muted-foreground": type === 'default',
          }
        )}>{icon}</div>}
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
