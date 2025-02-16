import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import Card from "../components/card";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="grid grid-cols-4 gap-5 m-4">
          {content.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>

        <Toaster />
      </SidebarProvider>
    </div>
  );
}
