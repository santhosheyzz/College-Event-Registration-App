
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ChatbotWidget from "@/components/ChatbotWidget";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="bg-black/70 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4 text-sm">
              <Link className="text-gray-300 hover:text-white" to="/">Home</Link>
              <Link className="text-gray-300 hover:text-white" to="/register">Participant Register</Link>
              <Link className="text-gray-300 hover:text-white" to="/admin-login">Admin Login</Link>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
