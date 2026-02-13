import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  Users,
  Scissors,
  Clock,
  TrendingUp,
} from "lucide-react";


const todayAppointments = [
  { id: 1, client: "Carlos Silva", service: "Corte + Barba", barber: "João", time: "09:00", status: "confirmed" as const },
  { id: 2, client: "Rafael Mendes", service: "Corte Degradê", barber: "Pedro", time: "09:45", status: "confirmed" as const },
  { id: 3, client: "Thiago Oliveira", service: "Barba", barber: "João", time: "10:30", status: "requested" as const },
  { id: 4, client: "Lucas Ferreira", service: "Corte Social", barber: "Pedro", time: "11:00", status: "completed" as const },
  { id: 5, client: "André Santos", service: "Corte + Sobrancelha", barber: "João", time: "14:00", status: "confirmed" as const },
];

const statusMap: Record<string, { label: string; variant: "success" | "warning" | "gold" | "ghost" }> = {
  confirmed: { label: "Confirmado", variant: "success" },
  requested: { label: "Pendente", variant: "warning" },
  completed: { label: "Concluído", variant: "gold" },
  cancelled: { label: "Cancelado", variant: "ghost" },
  no_show: { label: "Não compareceu", variant: "ghost" },
};

const topServices = [
  { name: "Corte Degradê", count: 48, revenue: "R$ 2.400" },
  { name: "Corte + Barba", count: 35, revenue: "R$ 2.450" },
  { name: "Barba", count: 22, revenue: "R$ 880" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-display text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Visão geral da sua barbearia
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Agendamentos Hoje"
          value="12"
          change="+3 vs ontem"
          changeType="up"
          icon={<Calendar className="h-5 w-5" />}
          delay={0}
        />
        <StatCard
          title="Faturamento (Mês)"
          value="R$ 8.450"
          change="+12% vs mês anterior"
          changeType="up"
          icon={<DollarSign className="h-5 w-5" />}
          delay={0.1}
        />
        <StatCard
          title="Clientes Ativos"
          value="156"
          change="+8 novos este mês"
          changeType="up"
          icon={<Users className="h-5 w-5" />}
          delay={0.2}
        />
        <StatCard
          title="Taxa de Retorno"
          value="72%"
          change="+5% vs mês anterior"
          changeType="up"
          icon={<TrendingUp className="h-5 w-5" />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl gold-border border lg:col-span-2"
        >
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Agenda de Hoje</h2>
            </div>
            <Badge variant="gold">{todayAppointments.length} agendamentos</Badge>
          </div>
          <div className="divide-y divide-border">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-mono font-semibold text-primary w-12">
                    {apt.time}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{apt.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {apt.service} • {apt.barber}
                    </p>
                  </div>
                </div>
                <Badge variant={statusMap[apt.status].variant}>
                  {statusMap[apt.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl gold-border border"
        >
          <div className="flex items-center gap-2 border-b border-border p-5">
            <Scissors className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Top Serviços</h2>
          </div>
          <div className="p-5 space-y-4">
            {topServices.map((svc, i) => (
              <div key={svc.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{svc.name}</p>
                    <p className="text-xs text-muted-foreground">{svc.count} atendimentos</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">{svc.revenue}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
