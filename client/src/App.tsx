import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import Dashboard from "@/pages/dashboard";
import Vouchers from "@/pages/vouchers";
import Reports from "@/pages/reports";
import Parties from "@/pages/parties";
import Donors from "@/pages/donors";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/vouchers" component={Vouchers} />
            <Route path="/reports" component={Reports} />
            <Route path="/parties" component={Parties} />
            <Route path="/donors" component={Donors} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
