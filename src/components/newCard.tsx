import axios from "axios";
import { ShareIcon, DeleteIcon } from "../components/icon/shareicon";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NewCard = ({ data }) => {
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
    } else if (data.link.includes("twitter.com")) {
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
    console.log("clicked");
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/api/v1/vrain/share",
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

      console.log(data._id);
      console.log(response);

      if (response.status === 200) {
        toast(response.data?.message || "Content shared successfully!");
      } else {
        toast.error("Failed to share content");
      }
    } catch (e) {
      console.error("Error occurred:", e.response || e); // Log more detailed error if available
    }
  };

  // Truncate Description to 20 Words
  const truncatedDescription = data?.description
    ? data.description.split(" ").slice(0, 20).join(" ") +
      (data.description.split(" ").length > 20 ? "..." : "")
    : "No description available.";

  return (
    <div>
      <div className="border-2 border-gray-400 min-h-72 w-60 rounded-xl p-1 shadow-lg">
        {/* Header */}
        <div className="flex justify-between p-1 items-center">
          <h1 className="w-full m-1 text-lg font-semibold">
            {data?.title || "Untitled"}
          </h1>
          <div className="flex justify-end gap-1">
            <div onClick={handleShareLink}>
              <ShareIcon />
            </div>
            <DeleteIcon />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full p-2 flex-wrap">
          {preview.includes("<blockquote") ? (
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          ) : (
            <a href={data.link} target="_blank">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover  rounded-md"
              />
            </a>
          )}
        </div>

        {/* Description */}
        <div className="p-2 text-sm text-left break-words">
          {truncatedDescription}
        </div>
        <div className="text-xs p-2">...tags</div>
      </div>
    </div>
  );
};

export default NewCard;
