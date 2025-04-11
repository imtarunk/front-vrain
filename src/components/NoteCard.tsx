import { Note } from "@/types";
import { useNavigate } from "react-router-dom";
import { Calendar, Eye, Tag, Share2, Lock } from "lucide-react";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${note._id}`);
  };

  // Get a color based on the note title (for the accent color)
  const getColorFromTitle = () => {
    const colors = [
      "from-amber-400 to-orange-400",
      "from-blue-400 to-indigo-400",
      "from-emerald-400 to-green-400",
      "from-rose-400 to-pink-400",
      "from-purple-400 to-violet-400",
      "from-teal-400 to-cyan-400",
    ];

    // Simple hash function to pick a consistent color
    const hash = note.title
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get accent color
  const accentColor = getColorFromTitle();

  return (
    <div
      className="w-full cursor-pointer transition-all duration-300 hover:translate-y-[-4px]"
      onClick={handleClick}
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all">
        {/* Colored accent bar at top */}
        <div className={`h-1.5 bg-gradient-to-r ${accentColor}`}></div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-800 truncate">
              {note.title}
            </h3>
            <div className="flex items-center gap-2">
              {note.isPublic ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                  <Eye className="h-3 w-3" />
                  <span>Public</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                  <Lock className="h-3 w-3" />
                  <span>Private</span>
                </div>
              )}
              {note.sharedWith && note.sharedWith.length > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-md">
                  <Share2 className="h-3 w-3" />
                  <span>{note.sharedWith.length} shared</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {note.content}
          </p>

          {note.tags && note.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-3 w-3 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span>
              Last updated:{" "}
              {new Date(note.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
