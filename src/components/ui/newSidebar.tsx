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

interface setPage {
  page?: string;
}

const NewSidebar = ({ setPage }: { setPage: setPage }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="border-r-2 border-gray-400 h-screen w-60 flex flex-col items-center fixed">
      {/* Centered Logo */}
      <div className="flex justify-center w-full mt-4">
        <LogoEmbed />
      </div>

      {/* Sidebar Menu */}
      <div className="w-full mt-6">
        <SidebarMenu
          text="Home"
          icon={<Home />}
          handleClick={() => setPage("Home")}
        />
        <button onClick={() => setIsModalOpen(true)} className="w-full">
          <SidebarMenu text="Add content" icon={<AddIcon />} />
        </button>

        <SidebarMenu
          text="Settings"
          icon={<SettingIcon />}
          handleClick={() => setPage("Setting")}
        />
        <SidebarMenu
          text="Link"
          icon={<LinkIcon />}
          handleClick={() => setPage("Link")}
        />
      </div>

      {/* Logout Button */}
      <div
        className="mt-auto mb-4 hover:bg-red-500 hover:text-white flex space-x-2 rounded-md p-3 cursor-pointer w-full justify-center"
        onClick={handleLogout}
      >
        <Logout />
        <span>Logout</span>
      </div>

      {/* Add Content Modal */}
      {isModalOpen && (
        <ModalForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </div>
  );
};

interface Props {
  text: string;
  icon: ReactElement;
}

const SidebarMenu = ({ text, icon, handleClick }: Props) => {
  return (
    <div
      className="flex gap-2 p-4 hover:bg-gray-300 w-full cursor-pointer"
      onClick={handleClick}
    >
      {icon}
      <span>{text}</span>
    </div>
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
  const [contentType, setContentType] = useState(""); // New state for content type

  const handleAddContent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/content",
        { title, link, description, type: contentType },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(contentType);
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 ">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 text-white relative z-60">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size="24px" />
          </button>
          <h2 className="text-xl font-semibold mb-4">Add Content</h2>

          {/* Title Input */}
          <div className="mb-3 text-black">
            <label className="block text-gray-300 mb-1">Title</label>
            <Input
              type="text"
              placeholder="Enter title"
              className="w-full p-2 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Link Input */}
          <div className="mb-3 text-black">
            <label className="block text-gray-300 mb-1">Link</label>
            <Input
              type="text"
              placeholder="Enter link"
              className="w-full p-2 rounded-md"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Content Type Selection */}
          <div className="mb-3">
            <label className="block text-gray-300 mb-1">Content Type</label>
            <select
              className="w-full p-2 rounded-md bg-gray-700 text-white"
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
          <div className="mb-3 text-black">
            <label className="block text-gray-300 mb-1">Description</label>
            <Textarea
              placeholder="Enter description"
              className="w-full p-2 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Add Content Button */}
          <Button className="w-full mt-2 border-2" onClick={handleAddContent}>
            Add Content
          </Button>
        </div>
      </div>
    )
  );
}
