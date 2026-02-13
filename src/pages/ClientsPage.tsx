import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Phone, Mail, Calendar } from "lucide-react";
import { useState } from "react";

const clients = [
  { id: 1, name: "Carlos Silva", phone: "(11) 98765-4321", email: "carlos@email.com", visits: 12, lastVisit: "2025-02-10" },
  { id: 2, name: "Rafael Mendes", phone: "(11) 91234-5678", email: null, visits: 8, lastVisit: "2025-02-08" },
  { id: 3, name: "Thiago Oliveira", phone: "(11) 99876-5432", email: "thiago@email.com", visits: 5, lastVisit: "2025-02-05" },
  { id: 4, name: "Lucas Ferreira", phone: "(11) 94567-8901", email: null, visits: 3, lastVisit: "2025-01-28" },
  { id: 5, name: "André Santos", phone: "(11) 97654-3210", email: "andre@email.com", visits: 15, lastVisit: "2025-02-12" },
  { id: 6, name: "Bruno Costa", phone: "(11) 93456-7890", email: null, visits: 1, lastVisit: "2025-02-01" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Clientes</h1>
          <p className="text-muted-foreground mt-1">{clients.length} clientes cadastrados</p>
        </div>
        <Button className="gold-gradient text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-secondary border-border"
        />
      </div>

      {/* Client list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl gold-border border overflow-hidden"
      >
        <div className="divide-y divide-border">
          {filtered.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{client.name}</p>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </span>
                    {client.email && (
                      <span className="hidden sm:flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(client.lastVisit).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <Badge variant={client.visits >= 10 ? "gold" : client.visits >= 5 ? "success" : "secondary"}>
                  {client.visits} visitas
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
