import axios from "axios";
import { ShareIcon, DeleteIcon } from "../components/icon/shareicon";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { backendURL } from "@/lib/utils";
import { ExternalLink, Twitter } from "lucide-react";

// Interface for type safety
interface Data {
  _id: string;
  link: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}

interface ShareResponse {
  message: string;
  data?: {
    hash: string;
    contentId: string;
    status: boolean;
    userId: string;
  };
}

interface ContentCardProps {
  data: Data;
  onClick?: (link: string) => void;
}

const NewCard = ({ data, onClick }: ContentCardProps) => {
  const [preview, setPreview] = useState<string>(
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
  );
  const [isTwitter, setIsTwitter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.link) {
      setError("No link provided");
      setIsLoading(false);
      return;
    }

    const fetchPreview = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if it's a Twitter/X link
        if (data.link.includes("twitter.com") || data.link.includes("x.com")) {
          setIsTwitter(true);
          const response = await fetch(
            `https://publish.x.com/oembed?url=${data.link}`
          );
          if (!response.ok) throw new Error("Failed to fetch Twitter preview");

          const resData = await response.json();
          if (resData.html) {
            setPreview(resData.html);
          } else {
            setPreview(
              "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
            );
          }
        } else if (
          data.link.includes("youtube.com") ||
          data.link.includes("youtu.be")
        ) {
          const videoId =
            data.link.split("v=")[1]?.split("&")[0] ||
            data.link.split("youtu.be/")[1];
          if (!videoId) throw new Error("Invalid YouTube URL");
          setPreview(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load preview");
        setPreview(
          "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();
  }, [data?.link]);

  const handleShareLink = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to share content");
        return;
      }

      const response = await axios.post<ShareResponse>(
        `${backendURL}/api/v1/vrain/share`,
        {
          contentId: data._id,
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
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
      (data.description.length > 20 ? "..." : "")
    : "No description available.";

  return (
    <div className="w-full h-full transition-all duration-300 hover:translate-y-[-6px]">
      <div className="bg-white w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100">
        {/* Preview Section */}
        <div className="relative w-full aspect-video bg-gray-50 overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="w-full h-full flex items-center justify-center bg-red-50">
              <p className="text-red-500 text-sm text-center px-4">{error}</p>
            </div>
          ) : typeof preview === "string" ? (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              onClick={(e) => {
                e.preventDefault();
                if (onClick) {
                  onClick(data.link);
                } else {
                  window.open(data.link, "_blank");
                }
              }}
            >
              <img
                src={preview}
                alt={data?.title || "Preview"}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-sm font-medium flex items-center">
                  <ExternalLink className="w-4 h-4 mr-1" /> Visit Link
                </span>
              </div>
            </a>
          ) : (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          )}

          {/* Tags as floating chips */}
          {data?.tags && data.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {data.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs rounded-full shadow-sm text-gray-800 font-medium"
                >
                  #{tag}
                </span>
              ))}
              {data.tags.length > 2 && (
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs rounded-full shadow-sm text-gray-800 font-medium">
                  +{data.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Header with Title and Actions */}
          <div className="flex justify-between items-start mb-3">
            <h1
              className="text-lg font-bold text-gray-800 line-clamp-1"
              title={data?.title || "Untitled"}
            >
              {data?.title || "Untitled"}
            </h1>
            <div className="flex gap-2 ml-2">
              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                title="Copy link"
              >
                <ShareIcon />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                title="Delete"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          {/* Twitter Indicator if applicable */}
          {isTwitter && (
            <div className="mb-3 flex items-center text-blue-500 text-sm font-medium bg-blue-50 rounded-lg p-2">
              <Twitter className="w-4 h-4 mr-1.5" />
              Twitter Post
            </div>
          )}

          {/* Description */}
          <div className="text-sm text-gray-600 mb-4 line-clamp-3">
            {truncatedDescription}
          </div>

          {/* Share Button */}
          <button
            onClick={handleShareLink}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow flex items-center justify-center"
          >
            Share Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
