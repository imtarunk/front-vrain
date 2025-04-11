import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { backendURL } from "@/lib/utils";

interface User {
  _id: string;
  username: string;
}

interface UserResponse {
  user: User;
}

interface NoteShareModalProps {
  noteId: string;
  onClose: () => void;
}

const NoteShareModal = ({ noteId, onClose }: NoteShareModalProps) => {
  const [username, setUsername] = useState("");
  const [permissionType, setPermissionType] = useState<
    "view" | "edit" | "admin"
  >("view");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to share notes");
        return;
      }

      // First, get the user ID from the username
      const userResponse = await axios.get<UserResponse>(
        `${backendURL}/api/v1/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User response:", userResponse.data);

      if (!userResponse.data.user) {
        toast.error("User not found");
        return;
      }

      // Then share the note with the user
      await axios.post(
        `${backendURL}/api/v1/notes/${noteId}/share`,
        {
          userId: userResponse.data.user._id,
          permissionType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Note shared successfully");
      onClose();
    } catch (error) {
      console.error("Error sharing note:", error);
      toast.error("Failed to share note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Share Note</h2>
        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select
            value={permissionType}
            onChange={(e) =>
              setPermissionType(e.target.value as "view" | "edit" | "admin")
            }
            className="w-full p-2 border rounded"
          >
            <option value="view">View Only</option>
            <option value="edit">Can Edit</option>
            <option value="admin">Full Access</option>
          </select>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={loading}>
              {loading ? "Sharing..." : "Share"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteShareModal;
