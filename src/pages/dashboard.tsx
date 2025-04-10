import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "@/components/newCard";
import NewSidebar from "@/components/ui/newSidebar";
import LinkPage from "./LinkPage";
import { Loader } from "lucide-react";
import { backendURL } from "@/lib/utils";

interface Content {
  _id: string;
  title: string;
  description: string;
  link: string;
  image?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface LinkData {
  _id: string;
  title: string;
  link: string;
  hash: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  Content?: Content[];
}

export default function Layout() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkList, setLinkList] = useState<LinkData[]>([]);
  const [page, setPage] = useState<string>("Home");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get<ApiResponse<Content[]>>(
          `${backendURL}/api/v1/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setContent(response.data.Content || []);
        } else {
          toast.error("Failed to fetch data");
        }
      } catch (error: unknown) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error(
          "Error fetching content:",
          err.response?.data?.message || err.message || "Unknown error"
        );
        toast.error("Error fetching content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (page === "Link") {
      handleLinkList();
    }
  }, [page]);

  const handleLinkList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get<ApiResponse<LinkData[]>>(
        `${backendURL}/api/v1/all-links`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Links fetched successfully");
        setLinkList(response.data.data);
      } else {
        toast.error("Failed to fetch links");
      }
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error(
        "Error fetching links:",
        err.response?.data?.message || err.message || "Unknown error"
      );
      toast.error("Error fetching links");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NewSidebar setPage={setPage} />

      <div className="ml-72 p-6 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {page === "Home" ? "My Content" : "Shared Links"}
          </h1>
          <p className="text-gray-500">
            {page === "Home"
              ? `Showing ${content.length} saved items`
              : `Showing ${linkList.length} shared links`}
          </p>
        </div>

        {page === "Home" && (
          <>
            {content.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-lg shadow">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  No content saved yet
                </h2>
                <p className="text-gray-500">
                  Save your first content to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {content.map((item) => (
                  <NewCard key={item._id} data={item} />
                ))}
              </div>
            )}
          </>
        )}

        {page === "Link" && <LinkPage data={linkList} />}
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}
