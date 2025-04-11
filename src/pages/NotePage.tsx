import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Loader,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import { backendURL } from "@/lib/utils";
import NoteEditor from "@/components/NoteEditor";
import NoteShareModal from "@/components/NoteShareModal";
import NotePermissions from "@/components/NotePermissions";

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  sharedWith?: {
    userId: string;
    permissionType: "view" | "edit" | "admin";
  }[];
}

const NotePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [shareLink, setShareLink] = useState<string>("");

  // Get a color based on the note title for accent
  const getNoteAccentColor = () => {
    if (!note?.title) return "bg-gradient-to-r from-blue-500 to-indigo-600";

    const colors = [
      "bg-gradient-to-r from-amber-500 to-orange-500",
      "bg-gradient-to-r from-blue-500 to-indigo-600",
      "bg-gradient-to-r from-emerald-500 to-green-500",
      "bg-gradient-to-r from-rose-500 to-pink-500",
      "bg-gradient-to-r from-purple-500 to-violet-500",
      "bg-gradient-to-r from-teal-500 to-cyan-500",
    ];

    // Simple hash function to pick a consistent color
    const hash = note.title
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view notes");
          navigate("/");
          return;
        }

        const response = await axios.get<{ note: Note }>(
          `${backendURL}/api/v1/notes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setNote(response.data.note);
          // Check if the current user is the owner
          const userId = localStorage.getItem("userId");
          setIsOwner(userId === response.data.note.userId);

          // Generate share link
          const shareLink = `${window.location.origin}/notes/${id}`;
          setShareLink(shareLink);
        } else {
          toast.error("Failed to fetch note");
        }
      } catch (error: unknown) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error(
          "Error fetching note:",
          err.response?.data?.message || err.message || "Unknown error"
        );
        toast.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`${backendURL}/api/v1/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Note deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleToggleVisibility = async () => {
    if (!note) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.patch<{ note: Note }>(
        `${backendURL}/api/v1/notes/${id}`,
        { isPublic: !note.isPublic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNote(response.data.note);
        toast.success(
          `Note is now ${response.data.note.isPublic ? "public" : "private"}`
        );
      }
    } catch (error) {
      console.error("Error updating note visibility:", error);
      toast.error("Failed to update note visibility");
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="animate-spin w-10 h-10 text-blue-500 mb-4 mx-auto" />
          <p className="text-gray-600">Loading your note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Note not found
          </h1>
          <p className="text-gray-600 mb-6">
            The note you're looking for might have been removed or you don't
            have permission to view it.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const accentColor = getNoteAccentColor();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to dashboard button at top */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </button>

        <div
          className={`${
            isEditing ? "" : "overflow-hidden"
          } bg-white rounded-xl shadow-lg`}
        >
          {/* Accent color bar if not editing */}
          {!isEditing && <div className={`h-2 ${accentColor}`}></div>}

          {isEditing ? (
            <div className="p-8">
              <NoteEditor
                note={note}
                onSave={() => {
                  setIsEditing(false);
                  // Refresh the note data
                  const fetchNote = async () => {
                    const token = localStorage.getItem("token");
                    if (!token) return;

                    const response = await axios.get<{ note: Note }>(
                      `${backendURL}/api/v1/notes/${id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (response.status === 200) {
                      setNote(response.data.note);
                    }
                  };
                  fetchNote();
                }}
              />
            </div>
          ) : (
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                  {note.title}
                </h1>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      note.isPublic
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {note.isPublic ? "Public" : "Private"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyShareLink}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Copy share link"
                    >
                      <LinkIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    {isOwner && (
                      <>
                        <button
                          onClick={handleToggleVisibility}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          title={note.isPublic ? "Make private" : "Make public"}
                        >
                          {note.isPublic ? (
                            <EyeOff className="h-5 w-5 text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          title="Edit note"
                        >
                          <Edit2 className="h-5 w-5 text-gray-600" />
                        </button>
                        <button
                          onClick={handleDelete}
                          className="p-2 hover:bg-red-100 rounded-full transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {note.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-6 bg-gray-50 p-3 rounded-lg">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose max-w-none my-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    Last updated: {new Date(note.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {isOwner && (
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Sharing & Permissions
                  </h3>
                  <NotePermissions noteId={note._id} isOwner={isOwner} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isShareModalOpen && (
        <NoteShareModal
          noteId={note._id}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};

export default NotePage;
