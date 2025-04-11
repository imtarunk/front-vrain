import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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

interface NoteEditorProps {
  note?: Note;
  onSave?: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const NoteEditor = ({ note, onSave }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");
  const [isPublic, setIsPublic] = useState(note?.isPublic || false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to save notes");
        navigate("/");
        return;
      }

      if (!title.trim() || !content.trim()) {
        toast.error("Title and content are required");
        return;
      }

      const noteData = {
        title: title.trim(),
        content: content.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        isPublic,
      };

      const response = note?._id
        ? await axios.put(`${backendURL}/api/v1/notes/${note._id}`, noteData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await axios.post(`${backendURL}/api/v1/notes`, noteData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

      if (response.status === 201 || response.status === 200) {
        toast.success(
          note?._id ? "Note updated successfully" : "Note created successfully"
        );
        if (onSave) {
          onSave();
        }
      } else {
        //@ts-expect-error response.data is not typed
        throw new Error(response.data?.message || "Failed to save note");
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error saving note:", apiError);
      toast.error(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to save note"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold"
      />
      <Textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[400px]"
      />
      <Input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label htmlFor="isPublic">Make this note public</label>
      </div>
      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Note"}
      </Button>
    </div>
  );
};

export default NoteEditor;
