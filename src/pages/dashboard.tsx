import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Card from "../components/card";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex m-4 gap-5 flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
