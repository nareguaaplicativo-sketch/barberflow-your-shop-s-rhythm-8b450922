import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-2xl gold-border border p-8 gold-glow">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="rounded-full gold-gradient p-3 mb-4">
              <Scissors className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold gold-text">BarberFlow</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {isSignUp ? "Crie sua conta" : "Acesse sua conta"}
            </p>
          </div>

          <div className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Seu nome" className="bg-secondary border-border" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" className="bg-secondary border-border" />
            </div>

            <Button className="w-full gold-gradient text-primary-foreground font-semibold text-base h-11">
              {isSignUp ? "Criar conta" : "Entrar"}
            </Button>

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
              >
                {isSignUp ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
