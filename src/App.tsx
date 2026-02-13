import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ServicesPage from "./pages/ServicesPage";
import StaffPage from "./pages/StaffPage";
import ClientsPage from "./pages/ClientsPage";
import ReportsPage from "./pages/ReportsPage";
import BookingPage from "./pages/BookingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/book/:shopSlug" element={<BookingPage />} />
          <Route path="/app" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/app/calendar" element={<AppLayout><CalendarPage /></AppLayout>} />
          <Route path="/app/services" element={<AppLayout><ServicesPage /></AppLayout>} />
          <Route path="/app/staff" element={<AppLayout><StaffPage /></AppLayout>} />
          <Route path="/app/clients" element={<AppLayout><ClientsPage /></AppLayout>} />
          <Route path="/app/reports" element={<AppLayout><ReportsPage /></AppLayout>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
