import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Users,
  UserCircle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/app", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/app/calendar", icon: Calendar, label: "Agenda" },
  { to: "/app/services", icon: Scissors, label: "Serviços" },
  { to: "/app/staff", icon: Users, label: "Equipe" },
  { to: "/app/clients", icon: UserCircle, label: "Clientes" },
  { to: "/app/reports", icon: BarChart3, label: "Relatórios" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold gold-text">
              BarberFlow
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Shop name */}
        <div className="border-b border-border px-6 py-3">
          <p className="text-sm font-medium text-foreground">Barbearia Demo</p>
          <p className="text-xs text-muted-foreground">Plano Premium</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary gold-border border"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border p-3 space-y-1">
          <NavLink
            to="/app/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Configurações
          </NavLink>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
