import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Star } from "lucide-react";

const staff = [
  { id: 1, name: "João Barbeiro", role: "barber", email: "joao@barberflow.com", active: true, appointments: 48, rating: 4.8 },
  { id: 2, name: "Pedro Costa", role: "barber", email: "pedro@barberflow.com", active: true, appointments: 35, rating: 4.6 },
];

const roleMap: Record<string, string> = {
  owner: "Proprietário",
  manager: "Gerente",
  barber: "Barbeiro",
  receptionist: "Recepcionista",
};

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Equipe</h1>
          <p className="text-muted-foreground mt-1">Gerencie os profissionais</p>
        </div>
        <Button className="gold-gradient text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Convidar Membro
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {staff.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl gold-border border p-6"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full gold-gradient flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="gold">{roleMap[member.role]}</Badge>
                  <Badge variant={member.active ? "success" : "ghost"}>
                    {member.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{member.appointments}</span> atendimentos
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                    <span className="font-semibold text-foreground">{member.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
