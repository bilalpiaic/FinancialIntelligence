import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import Dashboard from "@/pages/dashboard";
import ChartOfAccounts from "@/components/accounts/chart-of-accounts";
import Vouchers from "@/pages/vouchers";
import Reports from "@/pages/reports";
import Parties from "@/pages/parties";
import Donors from "@/pages/donors";
import AuthPage from "@/pages/auth";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          <Switch>
            <Route path="/auth" component={AuthPage} />
            <ProtectedRoute path="/" component={Dashboard} />
            <ProtectedRoute path="/accounts" component={ChartOfAccounts} />
            <ProtectedRoute path="/vouchers" component={Vouchers} />
            <ProtectedRoute path="/reports" component={Reports} />
            <ProtectedRoute path="/parties" component={Parties} />
            <ProtectedRoute path="/donors" component={Donors} />
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
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;