import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "@/components/newCard";
import NewSidebar from "@/components/ui/newSidebar";
import LinkPage from "./LinkPage";
import { Loader } from "lucide-react";

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
          return;
        }

        const response = await axios.get<ApiResponse<Content[]>>(
          "http://localhost:3001/api/v1/content",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched data:", response.data);
        if (response.status === 200) {
          setContent(response.data.Content || []);
          setLoading(false);
        } else {
          toast("Failed to fetch data");
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
        toast("Error fetching content");
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
        "http://localhost:3001/api/v1/all-links",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is link data", response.data);
      if (response.status === 200) {
        toast(response.data.message || "Links fetched successfully");
        setLinkList(response.data.data);
      } else {
        toast("Failed to fetch links");
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
      toast("Error fetching links");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  return (
    <div className="flex">
      <NewSidebar setPage={setPage} />
      <div className="ml-72 w-full mr-8">
        {page === "Home" &&
          content.map((item) => <NewCard key={item._id} data={item} />)}
        {page === "Link" && <LinkPage data={linkList} />}
      </div>
      <Toaster />
    </div>
  );
}
