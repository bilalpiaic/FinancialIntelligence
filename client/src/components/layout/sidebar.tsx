import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  PieChart,
  Users,
  Heart,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Vouchers", href: "/vouchers", icon: FileText },
  { name: "Reports", href: "/reports", icon: PieChart },
  { name: "Parties", href: "/parties", icon: Users },
  { name: "Donors", href: "/donors", icon: Heart },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-sidebar-foreground">Finance App</h1>
      </div>
      <nav className="px-3 py-4">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
