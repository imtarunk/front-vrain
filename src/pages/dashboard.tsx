import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "@/components/newCard";
import NewSidebar from "@/components/ui/newSidebar";
import LinkPage from "./LinkPage";

export default function Layout() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [LinkList, setLinkList] = useState([]);

  const [page, setPage] = useState("Home || addContent || Link || setting");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:3001/api/v1/content",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched data:", response.data);
        if (response.status === 200) {
          setContent(response.data?.Content || []);
          setLoading(false);
        } else {
          toast("Failed to fetch data");
        }
      } catch (error) {
        console.error(
          "Error fetching content:",
          error.response?.data || error.message
        );
        toast("Error fetching content");
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (page === "Link") {
      handelLinkList();
    }
  }, [page]);

  const handelLinkList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(
        "http://localhost:3001/api/v1/all-links",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("This is link data", response.data);
      if (response.status === 200) {
        toast(response.data?.message);
        setLinkList(response.data.data);
      } else {
        toast("Failed to fetch links");
      }
    } catch (error) {
      console.error(
        "Error fetching links:",
        error.response?.data || error.message
      );
      toast("Error fetching links");
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex">
      <NewSidebar setPage={setPage} />
      <div className="ml-72 w-full mr-8">
        {page === "Link" ? (
          <h1 className="text-4xl m-4 px-4 text-gray-600">Share links</h1>
        ) : (
          <h1 className="text-4xl m-4 px-4 text-gray-600">Notes</h1>
        )}
        {page === "Link" ? (
          <div className="border-1 rounded-sm space-y-2">
            <div className="container text-center">
              <div className="row">
                <div className="col-3 border">Title</div>
                <div className="col border">Link</div>
                <div className="col-2 border">Status</div>
              </div>
            </div>
            {LinkList.map((data, index) => (
              <LinkPage key={index} data={data} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 m-4 w-full">
            {content.map((item) => (
              <NewCard key={item._id} data={item} />
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
