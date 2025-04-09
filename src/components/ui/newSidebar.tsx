import { ReactElement, useState } from "react";
import LogoEmbed from "../icon/logo";
import {
  AddIcon,
  LinkIcon,
  Logout,
  SettingIcon,
  Home,
} from "../icon/shareicon";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import Avater from "../avater";
import { backendURL } from "@/lib/utils";

type SetPageFunction = (page: string) => void;

interface SidebarProps {
  setPage: SetPageFunction;
}

interface SidebarMenuProps {
  text: string;
  icon: ReactElement;
  handleClick?: () => void;
  active?: boolean;
}

const NewSidebar = ({ setPage }: SidebarProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setPage(page);
  };

  return (
    <div className="h-screen w-64 bg-gray-50 border-r border-gray-200 flex flex-col fixed shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-6 border-b border-gray-200">
        <LogoEmbed />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <SidebarMenu
          text="Home"
          icon={<Home />}
          handleClick={() => handlePageChange("Home")}
          active={activePage === "Home"}
        />
        <SidebarMenu
          text="Links"
          icon={<LinkIcon />}
          handleClick={() => handlePageChange("Link")}
          active={activePage === "Link"}
        />
        <SidebarMenu
          text="Settings"
          icon={<SettingIcon />}
          handleClick={() => handlePageChange("Setting")}
          active={activePage === "Setting"}
        />
      </nav>

      {/* Action Button */}
      <div className="px-4 py-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
        >
          <AddIcon />
          <span>Add Content</span>
        </button>
      </div>

      {/* User Profile & Logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avater />
            <div>
              <p className="text-sm font-medium text-gray-700">User Profile</p>
              <p className="text-xs text-gray-500">Manage account</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors duration-200"
            title="Logout"
          >
            <Logout />
          </button>
        </div>
      </div>

      {/* Add Content Modal */}
      {isModalOpen && (
        <ModalForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </div>
  );
};

const SidebarMenu = ({
  text,
  icon,
  handleClick,
  active = false,
}: SidebarMenuProps) => {
  return (
    <button
      className={`flex items-center w-full px-3 py-3 rounded-lg transition-colors duration-200 ${
        active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={handleClick}
    >
      <div className={`mr-3 ${active ? "text-blue-700" : "text-gray-500"}`}>
        {icon}
      </div>
      <span className="font-medium">{text}</span>
      {active && (
        <div className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full"></div>
      )}
    </button>
  );
};

export default NewSidebar;

interface ModalFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalForm({ isOpen, setIsOpen }: ModalFormProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("image");

  const handleAddContent = async () => {
    try {
      if (!title || !link) {
        toast.error("Title and link are required");
        return;
      }

      const response = await axios.post(
        `${backendURL}/api/v1/content`,
        { title, link, description, type: contentType },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        toast.success("Content Added Successfully");
        setIsOpen(false);
        // Reset form
        setTitle("");
        setLink("");
        setDescription("");
        setContentType("image");
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
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Content
            </h2>
            <button
              className="text-gray-400 hover:text-gray-600 focus:outline-none rounded-full p-1 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="px-6 py-4">
            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                type="text"
                placeholder="Enter content title"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Link Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link
              </label>
              <Input
                type="text"
                placeholder="https://example.com/content"
                className="w-full"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            {/* Content Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="audio">Audio</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                placeholder="Enter a brief description"
                className="w-full min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <Button onClick={handleAddContent} className="px-4 py-2">
              Add Content
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
