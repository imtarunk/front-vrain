import { useState, useEffect } from "react";

const Card = ({ data }) => {
  const [preview, setPreview] = useState(
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
  );

  useEffect(() => {
    if (!data.link) return;

    if (data.link.includes("youtube.com") || data.link.includes("youtu.be")) {
      // Extract video ID and get YouTube thumbnail
      const videoId =
        data.link.split("v=")[1]?.split("&")[0] ||
        data.link.split("youtu.be/")[1];
      setPreview(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else if (data.link.includes("twitter.com")) {
      // Fetch Twitter Embed
      fetch(`https://publish.x.com/oembed?url=${data.link}`)
        .then((res) => res.json())
        .then((data) => setPreview(data.html))
        .catch((err) => console.error("Twitter Embed Error:", err));
    }
  }, [data.link]);

  // Function to generate an AI-based placeholder thumbnail
  const generateAITumbnail = () => {
    return `https://source.unsplash.com/400x300/?technology,abstract`; // AI-like dynamic placeholder
  };

  return (
    <div className="h-full w-full">
      <div className="relative w-60 min-h-80 overflow-hidden rounded-xl border-2 shadow-lg bg-white transition-transform duration-300 hover:scale-105">
        {/* Title */}
        <h1 className="text-lg font-semibold text-center p-4">
          {data.title || "No Title"}
        </h1>

        {/* Background Image (Dynamic) */}
        <div className="absolute inset-0">
          {preview ? (
            preview.includes("<blockquote") ? ( // If it's a Twitter embed
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover opacity-80"
              />
            )
          ) : (
            <img
              src={
                "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
              } // Use AI-generated placeholder
              alt="Generated Thumbnail"
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>

        {/* Description */}
        <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium z-10">
          {data.link}
        </p>

        {/* Tags & Priority */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {data.title}
          </span>
          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            High
          </span>
        </div>

        {/* Blurred Light Effect */}
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
      </div>
    </div>
  );
};

export default Card;
