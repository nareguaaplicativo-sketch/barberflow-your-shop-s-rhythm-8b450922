import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

const hours = Array.from({ length: 12 }, (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`);

const appointments = [
  { id: 1, client: "Carlos Silva", service: "Corte + Barba", barber: "João", startHour: 9, duration: 1, color: "bg-primary/20 border-primary/40" },
  { id: 2, client: "Rafael Mendes", service: "Corte Degradê", barber: "Pedro", startHour: 9, duration: 0.75, color: "bg-success/20 border-success/40" },
  { id: 3, client: "Thiago Oliveira", service: "Barba", barber: "João", startHour: 10, duration: 0.5, color: "bg-warning/20 border-warning/40" },
  { id: 4, client: "Lucas Ferreira", service: "Corte Social", barber: "Pedro", startHour: 11, duration: 0.75, color: "bg-primary/20 border-primary/40" },
  { id: 5, client: "André Santos", service: "Corte + Sobrancelha", barber: "João", startHour: 14, duration: 1, color: "bg-success/20 border-success/40" },
];



export default function CalendarPage() {
  const [view, setView] = useState<"day" | "week">("day");
  const today = new Date();
  

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Agenda</h1>
          <p className="text-muted-foreground mt-1">Gerencie os atendimentos</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setView("day")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${view === "day" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Dia
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${view === "week" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Semana
            </button>
          </div>
          <Button className="gold-gradient text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </motion.div>

      {/* Date navigation */}
      <div className="flex items-center gap-4">
        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <span className="font-medium">{today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
        <button className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Calendar grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl gold-border border overflow-hidden"
      >
        {/* Header with barbers */}
        <div className="grid grid-cols-[80px_1fr_1fr] border-b border-border">
          <div className="border-r border-border p-3 text-xs text-muted-foreground">Horário</div>
          <div className="border-r border-border p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-6 w-6 rounded-full gold-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">J</div>
              <span className="text-sm font-medium">João</span>
            </div>
          </div>
          <div className="p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-6 w-6 rounded-full bg-success flex items-center justify-center text-[10px] font-bold text-success-foreground">P</div>
              <span className="text-sm font-medium">Pedro</span>
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="max-h-[600px] overflow-y-auto">
          {hours.map((hour) => {
            const hourNum = parseInt(hour);
            const joaoApts = appointments.filter((a) => a.barber === "João" && a.startHour === hourNum);
            const pedroApts = appointments.filter((a) => a.barber === "Pedro" && a.startHour === hourNum);

            return (
              <div key={hour} className="grid grid-cols-[80px_1fr_1fr] border-b border-border/50 min-h-[60px]">
                <div className="border-r border-border/50 p-2 text-xs text-muted-foreground flex items-start justify-end pr-3 pt-1">
                  {hour}
                </div>
                <div className="border-r border-border/50 p-1">
                  {joaoApts.map((apt) => (
                    <div
                      key={apt.id}
                      className={`rounded-md border p-2 ${apt.color} cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      <p className="text-xs font-medium text-foreground">{apt.client}</p>
                      <p className="text-[10px] text-muted-foreground">{apt.service}</p>
                    </div>
                  ))}
                </div>
                <div className="p-1">
                  {pedroApts.map((apt) => (
                    <div
                      key={apt.id}
                      className={`rounded-md border p-2 ${apt.color} cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      <p className="text-xs font-medium text-foreground">{apt.client}</p>
                      <p className="text-[10px] text-muted-foreground">{apt.service}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
