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
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { X } from "lucide-react";
import axios from "axios";

interface ModalFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppSidebar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the stored token
    toast.success("Logged out successfully!");
    navigate("/"); // Navigate instead of reloading
  };

  // Menu items with types for better type safety
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
      onClick: () => setIsModalOpen(true),
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
    <>
      <Sidebar className="transition-all duration-300 ease-in-out">
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
                      <a
                        href={item.url}
                        className="flex items-center gap-2 hover:bg-gray-700 transition-all duration-300 ease-in-out"
                        onClick={
                          item.onClick
                            ? (e) => {
                                e.preventDefault();
                                item.onClick();
                              }
                            : undefined
                        }
                      >
                        <item.icon size="24px" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Logout Button */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:bg-gray-700 transition-all duration-300 ease-in-out"
                  >
                    <CiLogin size="24px" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* Avatar Section at Bottom */}
        <div className="flex flex-col items-center mt-auto p-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-300">User Name</span>
        </div>
      </Sidebar>
      <ModalForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}

export function ModalForm({ isOpen, setIsOpen }: ModalFormProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleAddContent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/content",
        { title, link, description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Content Added Successfully");
        setIsOpen(false);
      } else {
        toast.error("Failed to add content");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error adding content");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20 transition-all duration-300 ease-in-out">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-96 text-black relative">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size="24px" />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Add Content
          </h2>
          <div className="mb-3">
            <label className="block text-gray-300 mb-1">Title</label>
            <Input
              type="text"
              placeholder="Enter title"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-300 mb-1">Link</label>
            <Input
              type="text"
              placeholder="Enter link"
              className="w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-300 mb-1">Description</label>
            <Textarea
              placeholder="Enter description"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button className="w-full mt-2 border-2" onClick={handleAddContent}>
            Add Content
          </Button>
        </div>
      </div>
    )
  );
}
