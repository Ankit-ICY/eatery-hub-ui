import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import FoodItems from "./pages/FoodItems";
import AddStaff from "./pages/AddStaff";
import NotFound from "./pages/NotFound";
import Toaster from "./components/Toaster";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:companyId" element={<CompanyDetails />} />
        <Route path="/company/:companyId/items" element={<FoodItems />} />
        <Route path="/company/:companyId/add-staff" element={<AddStaff />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;