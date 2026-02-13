import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  delay?: number;
}

export function StatCard({ title, value, change, changeType = "neutral", icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card rounded-xl p-5 gold-border border"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold font-display text-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                changeType === "up" && "text-success",
                changeType === "down" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">{icon}</div>
      </div>
    </motion.div>
  );
}
