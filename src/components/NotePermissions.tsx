import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendURL } from "@/lib/utils";
import { User, X } from "lucide-react";

interface Permission {
  _id: string;
  userId: string;
  username: string;
  permissionType: "view" | "edit" | "admin";
  createdAt: string;
}

interface NotePermissionsProps {
  noteId: string;
  isOwner: boolean;
}

const NotePermissions = ({ noteId, isOwner }: NotePermissionsProps) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermissions();
  }, [noteId]);

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get<{ permissions: Permission[] }>(
        `${backendURL}/api/v1/notes/${noteId}/permissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPermissions(response.data.permissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Failed to fetch permissions");
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePermission = async (permissionId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        `${backendURL}/api/v1/notes/${noteId}/permissions/${permissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Permission removed successfully");
      fetchPermissions();
    } catch (error) {
      console.error("Error removing permission:", error);
      toast.error("Failed to remove permission");
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading permissions...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shared with</h3>
      {permissions.length === 0 ? (
        <p className="text-gray-500">No one has access to this note yet</p>
      ) : (
        <div className="space-y-2">
          {permissions.map((permission) => (
            <div
              key={permission._id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{permission.username}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {permission.permissionType} access
                  </p>
                </div>
              </div>
              {isOwner && (
                <button
                  onClick={() => handleRemovePermission(permission._id)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotePermissions;
