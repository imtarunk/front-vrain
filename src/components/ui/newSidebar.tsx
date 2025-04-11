import React, { ReactElement, useState, useEffect } from "react";
import LogoEmbed from "../icon/logo";
import {
  AddIcon,
  LinkIcon,
  Logout,
  SettingIcon,
  Home,
  FileText,
} from "../icon/shareicon";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { X, Search, ChevronRight, Calendar, Bookmark } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import Avatar from "../avater";
import NoteEditor from "../NoteEditor";
import { backendURL } from "@/lib/utils";

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotesResponse {
  notes: Note[];
  sharedNotes: Note[];
}

type SetPageFunction = (page: string) => void;

interface SidebarProps {
  setPage: SetPageFunction;
}

interface UserResponse {
  fullname: string;
}

interface SidebarMenuProps {
  text: string;
  icon: ReactElement<{ size?: number; className?: string }>;
  active?: boolean;
  handleClick?: () => void;
}

const ModernSidebar = ({ setPage }: SidebarProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [activePage, setActivePage] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState<string>("");

  useEffect(() => {
    fetchRecentNotes();

    // Check for saved state
    const savedCollapsedState = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsedState) {
      setIsCollapsed(JSON.parse(savedCollapsedState));
    }

    // Responsive handling
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get<UserResponse>(
          `${backendURL}/api/v1/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data.fullname);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData("");
      }
    };
    fetchUserData();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setPage(page);
  };

  const fetchRecentNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get<NotesResponse>(
        `${backendURL}/api/v1/notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecentNotes(response.data.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const filteredNotes = recentNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className={`fixed top-4 ${
          isCollapsed ? "left-4" : "hidden"
        } z-20 md:hidden bg-white p-2 rounded-full shadow-lg`}
        onClick={toggleSidebar}
      >
        <ChevronRight size={20} className={isCollapsed ? "" : "rotate-180"} />
      </button>

      <div
        className={`transition-all duration-300 border-r border-gray-200 h-screen 
        ${isCollapsed ? "w-16" : "w-64"} flex flex-col fixed left-0 top-0 z-10 
        bg-white shadow-sm transform ${
          isCollapsed && window.innerWidth < 768
            ? "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        {/* Collapse/Expand Button (Desktop) */}
        <button
          className="absolute -right-3 top-20 hidden md:flex h-6 w-6 bg-white rounded-full border border-gray-200 shadow-sm items-center justify-center"
          onClick={toggleSidebar}
        >
          <ChevronRight size={14} className={isCollapsed ? "" : "rotate-180"} />
        </button>

        {/* Logo Section */}
        <div
          className={`flex items-center justify-center py-6 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <div
            className={`${
              isCollapsed ? "scale-75" : ""
            } transition-transform duration-300`}
          >
            <LogoEmbed />
          </div>
        </div>

        {/* Search Bar - Only visible when expanded */}
        {!isCollapsed && (
          <div className="px-4 mb-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="mt-2 flex-grow overflow-y-auto">
          <div className="space-y-1">
            <SidebarMenu
              text="Home"
              icon={<Home />}
              active={activePage === "Home"}
              handleClick={() => handlePageChange("Home")}
            />
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="w-full text-left"
            >
              <SidebarMenu text="New Note" icon={<FileText />} active={false} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left"
            >
              <SidebarMenu
                text="Add Content"
                icon={<AddIcon />}
                active={false}
              />
            </button>
            <SidebarMenu
              text="Calendar"
              icon={<Calendar />}
              active={activePage === "Calendar"}
              handleClick={() => handlePageChange("Calendar")}
            />
            <SidebarMenu
              text="Links"
              icon={<LinkIcon />}
              active={activePage === "Link"}
              handleClick={() => handlePageChange("Link")}
            />
            <SidebarMenu
              text="Settings"
              icon={<SettingIcon />}
              active={activePage === "Setting"}
              handleClick={() => handlePageChange("Setting")}
            />
          </div>

          {/* Recent Notes Section - Only visible when expanded */}
          {!isCollapsed && (
            <div className="mt-8 px-3">
              <h3 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mx-3 mb-3">
                Recent Notes
              </h3>
              <div className="space-y-0.5">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <div
                      key={note._id}
                      className="flex items-start gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors group"
                      onClick={() => {
                        handlePageChange("Note");
                        // You might want to set active note ID here as well
                      }}
                    >
                      <Bookmark
                        size={14}
                        className="mt-1 text-gray-400 flex-shrink-0"
                      />
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {note.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : searchQuery ? (
                  <p className="text-xs text-gray-500 px-3">No notes found</p>
                ) : (
                  <p className="text-xs text-gray-500 px-3">No recent notes</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="mt-auto border-t border-gray-200">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center p-3" : "px-4 py-3"
            } cursor-pointer hover:bg-gray-100 transition-colors`}
          >
            {isCollapsed ? (
              <div onClick={handleLogout}>
                <Avatar fullname={userData} />
              </div>
            ) : (
              <>
                <Avatar fullname={userData} />
                <div className="ml-3 flex-grow">
                  <p className="text-xl font-medium text-black">
                    {userData || "User"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors"
                >
                  <Logout />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Content Modal */}
      {isModalOpen && (
        <ModalForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}

      {/* New Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full h-full md:w-3/4 md:h-3/4 overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">New Note</h2>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <NoteEditor
              onSave={() => {
                setIsNoteModalOpen(false);
                fetchRecentNotes();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarMenu = ({
  text,
  icon,
  active = false,
  handleClick,
}: SidebarMenuProps) => {
  const isCollapsed = window.innerWidth < 768;

  return (
    <div
      className={`flex items-center ${
        isCollapsed ? "justify-center mx-2 p-3" : "px-3 py-2.5 mx-2"
      } rounded-md cursor-pointer transition-all ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={handleClick}
    >
      <div className={active ? "text-blue-600" : "text-gray-500"}>
        {React.cloneElement(icon, { size: isCollapsed ? 20 : 18 })}
      </div>
      {!isCollapsed && <span className="ml-3 text-sm">{text}</span>}
    </div>
  );
};

export default ModernSidebar;

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
