import axios from "axios";
import { ShareIcon, DeleteIcon } from "../components/icon/shareicon";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { backendURL } from "@/lib/utils";

// Interface for type safety
interface Data {
  _id: string;
  link: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}

const NewCard = ({ data }: { data: Data }) => {
  const [preview, setPreview] = useState(
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
  );

  useEffect(() => {
    if (!data?.link) return;

    if (data.link.includes("youtube.com") || data.link.includes("youtu.be")) {
      // Extract YouTube video ID
      const videoId =
        data.link.split("v=")[1]?.split("&")[0] ||
        data.link.split("youtu.be/")[1];
      setPreview(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else if (data.link.includes("x.com")) {
      // Twitter embeds may require authentication or additional CORS handling
      fetch(`https://publish.x.com/oembed?url=${data.link}`)
        .then((res) => res.json())
        .then((resData) => {
          if (resData.html) {
            setPreview(resData.html);
          } else {
            setPreview(
              "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
            ); // Default Twitter icon
          }
        })
        .catch(() => {
          setPreview(
            "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
          ); // Handle errors
        });
    }
  }, [data?.link]); // Added optional chaining to prevent crashes

  const handleShareLink = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        toast.error("Please login to share content");
        return;
      }

      const response = await axios.post(
        `${backendURL}/api/v1/vrain/share`,
        {
          contentId: data._id,
          status: true, // Set status to true for sharing
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to headers
          },
        }
      );

      if (response.status === 200) {
        //@ts-ignore=
        toast.success(response.data?.message || "Content shared successfully!");
      } else {
        toast.error("Failed to share content");
      }
    } catch (e) {
      console.error("Error occurred:", e);
      toast.error("Failed to share content");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to delete content");
        return;
      }

      await axios.delete(`${backendURL}/api/v1/delete/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Content deleted successfully!");
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.link);
    toast.success("Link copied to clipboard");
  };

  // Truncate Description to 20 Words
  const truncatedDescription = data?.description
    ? data.description.split(" ").slice(0, 20).join(" ") +
      (data.description.split(" ").length > 20 ? "..." : "")
    : "No description available.";

  // Format tags for display
  const displayTags = data?.tags?.length
    ? data.tags.map((tag) => `#${tag}`).join(" ")
    : "No tags";

  return (
    <div className="m-4 transform transition-all duration-300 hover:scale-105">
      <div className="border border-gray-200 bg-white min-h-72 w-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Preview Section */}
        <div className="w-full h-40 bg-gray-100 overflow-hidden">
          {typeof preview === "string" ? (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={preview}
                alt={data?.title || "Preview"}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </a>
          ) : (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          )}
        </div>

        {/* Content Container */}
        <div className="p-3">
          {/* Header with Title and Actions */}
          <div className="flex justify-between items-start mb-2">
            <h1
              className="text-lg font-semibold text-gray-800 line-clamp-1"
              title={data?.title || "Untitled"}
            >
              {data?.title || "Untitled"}
            </h1>
            <div className="flex gap-2 ml-2">
              <button
                onClick={handleCopyLink}
                className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
                title="Copy link"
              >
                <ShareIcon />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                title="Delete"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-600 mb-3 line-clamp-3">
            {truncatedDescription}
          </div>

          {/* Tags */}
          <div className="text-xs text-blue-500 italic">{displayTags}</div>
        </div>

        {/* Share Button */}
        <div className="px-3 pb-3">
          <button
            onClick={handleShareLink}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
          >
            Share Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
