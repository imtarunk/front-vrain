import { Calendar, Home, Inbox, Settings } from "lucide-react";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the stored token
    toast.success("Logged out successfully!");
    navigate("/auth"); // Navigate instead of reloading
  };

  // Menu items.
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Add content",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Share",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="text-2xl p-4">Vrain</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon size="24px" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout Button */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <CiLogin size="24px" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
