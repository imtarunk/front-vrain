import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import NewSidebar from "@/components/ui/newSidebar";
import LinkPage from "./LinkPage";
import { Loader } from "lucide-react";
import { backendURL } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import NoteCard from "@/components/NoteCard";
import ContentCard from "@/components/ContentCard";
import { Note, Card, LinkData } from "@/types";

interface NotesResponse {
  notes: Note[];
  message?: string;
}

interface ContentResponse {
  Content: Card[];
  message?: string;
}

interface LinksResponse {
  data: LinkData[];
  message?: string;
}

interface ApiError {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

export default function Layout() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkList, setLinkList] = useState<LinkData[]>([]);
  const [page, setPage] = useState<string>("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          navigate("/auth");
          return;
        }

        // Fetch notes
        const notesResponse = await axios.get<NotesResponse>(
          `${backendURL}/api/v1/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(notesResponse.data);
        // Fetch cards
        const cardsResponse = await axios.get<ContentResponse>(
          `${backendURL}/api/v1/content`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (notesResponse.data && notesResponse.data.notes) {
          setNotes(notesResponse.data.notes);
        }
        if (cardsResponse.data && cardsResponse.data.Content) {
          setCards(cardsResponse.data.Content);
        }
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        const apiError = error as ApiError;
        if (apiError.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/auth");
        } else {
          toast.error(apiError.response?.data.message || "Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

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
        navigate("/auth");
        return;
      }

      const response = await axios.get<LinksResponse>(
        `${backendURL}/api/v1/all-links`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setLinkList(response.data.data);
        toast.success(response.data.message || "Links fetched successfully");
      }
    } catch (error: unknown) {
      console.error("Error fetching links:", error);
      const apiError = error as ApiError;
      if (apiError.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/auth");
      } else {
        toast.error(apiError.response?.data.message || "Error fetching links");
      }
    }
  };

  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
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

      <div className="flex-1 p-4 md:p-6 lg:ml-72">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {page === "Home" ? "My Content" : "Shared Links"}
          </h1>
          <p className="text-gray-500">
            {page === "Home"
              ? `Showing ${notes.length + cards.length} items`
              : `Showing ${linkList.length} shared links`}
          </p>
        </div>

        {page === "Home" && (
          <>
            {notes.length === 0 && cards.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-lg shadow">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  No content yet
                </h2>
                <p className="text-gray-500">
                  Create your first note or add content to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Notes Section */}
                {notes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Notes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {notes.map((note) => (
                        <NoteCard key={note._id} note={note} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Cards Section */}
                {cards.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Saved Content
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {cards.map((card) => (
                        <div key={card._id} className="w-full">
                          <ContentCard data={card} onClick={handleCardClick} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
