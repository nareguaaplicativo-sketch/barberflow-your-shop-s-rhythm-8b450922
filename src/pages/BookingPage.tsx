import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Clock, DollarSign, User, Phone, ChevronRight, ChevronLeft, Check, Calendar, MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

const shopData = {
  name: "Barbearia Demo",
  slug: "demo",
  phone: "(11) 99999-9999",
};

const services = [
  { id: 1, name: "Corte Degradê", duration: 45, price: 5000 },
  { id: 2, name: "Corte Social", duration: 30, price: 4000 },
  { id: 3, name: "Barba", duration: 30, price: 4000 },
  { id: 4, name: "Corte + Barba", duration: 60, price: 7000 },
  { id: 5, name: "Corte + Sobrancelha", duration: 50, price: 5500 },
];

const barbers = [
  { id: "any", name: "Qualquer profissional" },
  { id: "1", name: "João Barbeiro" },
  { id: "2", name: "Pedro Costa" },
];

const availableTimes = ["09:00", "09:45", "10:30", "11:15", "14:00", "14:45", "15:30", "16:15", "17:00"];

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

const steps = ["Serviço", "Profissional", "Data e Hora", "Seus Dados", "Confirmação"];

export default function BookingPage() {
  const { shopSlug: _shopSlug } = useParams();
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const service = services.find((s) => s.id === selectedService);
  const barber = barbers.find((b) => b.id === selectedBarber);

  const canAdvance = () => {
    switch (step) {
      case 0: return selectedService !== null;
      case 1: return selectedBarber !== null;
      case 2: return selectedDate && selectedTime;
      case 3: return clientName.trim().length >= 2 && clientPhone.trim().length >= 10;
      default: return true;
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    const whatsappMsg = encodeURIComponent(
      `Olá! Confirmei meu agendamento na ${shopData.name}.\n\n` +
      `📅 ${selectedDate} às ${selectedTime}\n` +
      `✂️ ${service?.name}\n` +
      `👤 ${clientName}`
    );

    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <div className="glass-card rounded-2xl gold-border border p-8 gold-glow">
            <div className="rounded-full gold-gradient w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Agendamento Confirmado!</h2>
            <p className="text-muted-foreground text-sm mb-6">Seu horário foi reservado com sucesso.</p>

            <div className="glass-card rounded-lg p-4 text-left space-y-2 mb-6 border border-border">
              <p className="text-sm"><span className="text-muted-foreground">Serviço:</span> <span className="font-medium text-foreground">{service?.name}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Profissional:</span> <span className="font-medium text-foreground">{barber?.name}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Data:</span> <span className="font-medium text-foreground">{selectedDate} às {selectedTime}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Valor:</span> <span className="font-semibold text-primary">{service ? formatCurrency(service.price) : ""}</span></p>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/5511999999999?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2 bg-success hover:bg-success/90 text-success-foreground">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto max-w-lg flex items-center gap-3">
          <div className="rounded-full gold-gradient p-2">
            <Scissors className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">{shopData.name}</h1>
            <p className="text-xs text-muted-foreground">Agendamento online</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto max-w-lg flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-colors",
                i <= step ? "gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-0.5 flex-1 mx-1 rounded-full", i < step ? "gold-gradient" : "bg-secondary")} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">{steps[step]}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {/* Step 0: Service */}
            {step === 0 && (
              <div className="space-y-3">
                <h2 className="font-display text-xl font-bold">Escolha o serviço</h2>
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc.id)}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition-all",
                      selectedService === svc.id
                        ? "border-primary bg-primary/10 gold-glow"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{svc.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{svc.duration} min</span>
                          <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{formatCurrency(svc.price)}</span>
                        </div>
                      </div>
                      <div className={cn(
                        "h-5 w-5 rounded-full border-2 transition-colors",
                        selectedService === svc.id ? "border-primary bg-primary" : "border-muted-foreground"
                      )} />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Barber */}
            {step === 1 && (
              <div className="space-y-3">
                <h2 className="font-display text-xl font-bold">Escolha o profissional</h2>
                {barbers.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBarber(b.id)}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition-all",
                      selectedBarber === b.id
                        ? "border-primary bg-primary/10 gold-glow"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {b.name.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{b.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Date/Time */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Escolha data e horário</h2>
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-secondary border-border"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                {selectedDate && (
                  <div className="space-y-2">
                    <Label>Horário</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={cn(
                            "rounded-lg border py-3 text-sm font-medium transition-all",
                            selectedTime === t
                              ? "border-primary bg-primary/10 text-primary gold-glow"
                              : "border-border bg-card text-foreground hover:border-primary/50"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Client data */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Seus dados</h2>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="clientName" placeholder="Seu nome completo" value={clientName} onChange={(e) => setClientName(e.target.value)} className="pl-10 bg-secondary border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="clientPhone" placeholder="(11) 99999-9999" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="pl-10 bg-secondary border-border" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Confirme seu agendamento</h2>
                <div className="glass-card rounded-xl border border-border p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Scissors className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Serviço:</span>
                    <span className="font-medium text-foreground">{service?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Profissional:</span>
                    <span className="font-medium text-foreground">{barber?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-medium text-foreground">{selectedDate} às {selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-semibold text-primary">{service ? formatCurrency(service.price) : ""}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{clientName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{clientPhone}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="sticky bottom-0 border-t border-border bg-card px-4 py-4">
        <div className="mx-auto max-w-lg flex items-center gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className="gold-gradient text-primary-foreground gap-1"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleConfirm} className="gold-gradient text-primary-foreground gap-1">
              <Check className="h-4 w-4" />
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
