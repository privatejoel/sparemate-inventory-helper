
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Assets from "./pages/Assets";
import NewAsset from "./pages/NewAsset";
import SpareParts from "./pages/SpareParts";
import Reorders from "./pages/Reorders";
import Reports from "./pages/Reports";
import NewReorder from "./pages/NewReorder";
import Settings from "./pages/Settings";
import NewSparePart from "./pages/NewSparePart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/assets/new" element={<NewAsset />} />
          <Route path="/spare-parts" element={<SpareParts />} />
          <Route path="/spare-parts/new" element={<NewSparePart />} />
          <Route path="/reorders" element={<Reorders />} />
          <Route path="/reorders/new" element={<NewReorder />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
