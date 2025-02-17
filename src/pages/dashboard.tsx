import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "@/components/newCard";
import NewSidebar from "@/components/ui/newSidebar";

export default function Layout() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:3001/api/v1/content",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to headers
            },
          }
        );

        console.log("Fetched data:", response.data); // Log the response
        if (Array.isArray(response.data)) {
          setContent(response.data); // If response is an array, store it directly
        } else if (Array.isArray(response.data?.Content)) {
          setContent(response.data.Content); // If response has a 'Content' key with an array, use that
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error(
          "Error fetching content:",
          error.response?.data || error.message
        );
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="flex">
      <NewSidebar />
      <div className="ml-72">
        <h1 className="text-4xl m-4 px-4 text-gray-800">Notes</h1>
        <div className="flex  flex-wrap gap-4 m-4 w-full">
          {content.map((item) => (
            <NewCard key={item._id} data={item} />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
