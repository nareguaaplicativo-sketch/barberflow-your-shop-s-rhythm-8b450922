import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";

import { DollarSign, Calendar, Scissors, Users, TrendingUp } from "lucide-react";

const barberPerformance = [
  { name: "João Barbeiro", appointments: 48, revenue: "R$ 3.200", rating: 4.8 },
  { name: "Pedro Costa", appointments: 35, revenue: "R$ 2.450", rating: 4.6 },
];

const topServices = [
  { name: "Corte Degradê", count: 48, percent: 35 },
  { name: "Corte + Barba", count: 35, percent: 25 },
  { name: "Barba", count: 22, percent: 16 },
  { name: "Corte Social", count: 18, percent: 13 },
  { name: "Corte + Sobrancelha", count: 15, percent: 11 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold font-display">Relatórios</h1>
        <p className="text-muted-foreground mt-1">Resumo do mês de Fevereiro 2026</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Faturamento Total" value="R$ 8.450" change="+12% vs jan" changeType="up" icon={<DollarSign className="h-5 w-5" />} delay={0} />
        <StatCard title="Atendimentos" value="138" change="+8 vs jan" changeType="up" icon={<Calendar className="h-5 w-5" />} delay={0.1} />
        <StatCard title="Ticket Médio" value="R$ 61,23" change="+3%" changeType="up" icon={<TrendingUp className="h-5 w-5" />} delay={0.2} />
        <StatCard title="Novos Clientes" value="18" change="+5 vs jan" changeType="up" icon={<Users className="h-5 w-5" />} delay={0.3} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Barber performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl gold-border border">
          <div className="flex items-center gap-2 border-b border-border p-5">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Desempenho por Profissional</h2>
          </div>
          <div className="divide-y divide-border">
            {barberPerformance.map((b) => (
              <div key={b.name} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.appointments} atendimentos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{b.revenue}</p>
                  <p className="text-xs text-muted-foreground">⭐ {b.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top services */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl gold-border border">
          <div className="flex items-center gap-2 border-b border-border p-5">
            <Scissors className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Top Serviços</h2>
          </div>
          <div className="p-5 space-y-4">
            {topServices.map((svc) => (
              <div key={svc.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{svc.name}</span>
                  <span className="text-muted-foreground">{svc.count} ({svc.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full gold-gradient" style={{ width: `${svc.percent * 2.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
