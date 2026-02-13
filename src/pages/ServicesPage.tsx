import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Scissors, Clock, DollarSign } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const services = [
  { id: 1, name: "Corte Degradê", duration: 45, price: 5000, active: true },
  { id: 2, name: "Corte Social", duration: 30, price: 4000, active: true },
  { id: 3, name: "Barba", duration: 30, price: 4000, active: true },
  { id: 4, name: "Corte + Barba", duration: 60, price: 7000, active: true },
  { id: 5, name: "Corte + Sobrancelha", duration: 50, price: 5500, active: true },
  { id: 6, name: "Hidratação Capilar", duration: 40, price: 6000, active: false },
];

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Serviços</h1>
          <p className="text-muted-foreground mt-1">Gerencie os serviços oferecidos</p>
        </div>
        <Button className="gold-gradient text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Novo Serviço
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl gold-border border p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Scissors className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{svc.name}</h3>
                  <Badge variant={svc.active ? "success" : "ghost"} className="mt-1">
                    {svc.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
              <Switch checked={svc.active} />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{svc.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold text-primary">{formatCurrency(svc.price)}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full gap-2">
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
