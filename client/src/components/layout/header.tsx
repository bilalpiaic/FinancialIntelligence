import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bell, Settings } from "lucide-react";

export default function Header() {
  const { toast } = useToast();

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        <h2 className="text-lg font-semibold">Financial Management System</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              toast({
                title: "Notifications",
                description: "No new notifications",
              })
            }
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
