import { useState } from "react";
import {
  BrainCircuit,
  FileText,
  Calendar,
  Image,
  Link,
  BookOpen,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const navigate = useNavigate();

  // Placeholder data
  const notes = [
    {
      id: 1,
      title: "Meeting Notes",
      date: "Today, 2:30 PM",
      preview: "Discussed new project timeline and resource allocation...",
    },
    {
      id: 2,
      title: "Ideas for Blog Post",
      date: "Yesterday",
      preview:
        "Key points to cover: AI trends, machine learning applications...",
    },
    {
      id: 3,
      title: "Research Summary",
      date: "Apr 8, 2025",
      preview: "Found interesting correlation between usage patterns and...",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: "Today, 4:00 PM",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Project Deadline",
      date: "Apr 15, 2025",
      location: "Remote",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "Apr 18, 2025",
      location: "Client Office",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header/Navigation */}
      <header className="bg-black bg-opacity-40 border-b border-gray-800 backdrop-blur-md fixed w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit size={28} className="text-blue-400" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Vrain
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="hover:text-blue-400 transition">
                Features
              </a>
              <a
                href="#how-it-works"
                className="hover:text-blue-400 transition"
              >
                How It Works
              </a>
              <a href="#pricing" className="hover:text-blue-400 transition">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} className="text-blue-400" />
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-12 pt-4">
            <h2 className="text-3xl font-bold mb-2">Welcome to Vrain</h2>
            <p className="text-gray-400">
              Your smart digital brain for notes, events, media, and more.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <button className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl p-4 flex flex-col items-center gap-2 transition">
              <FileText size={24} />
              <span className="font-medium">New Note</span>
            </button>
            <button className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl p-4 flex flex-col items-center gap-2 transition">
              <Calendar size={24} />
              <span className="font-medium">New Event</span>
            </button>
            <button className="bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl p-4 flex flex-col items-center gap-2 transition">
              <Link size={24} />
              <span className="font-medium">Save Link</span>
            </button>
            <button className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl p-4 flex flex-col items-center gap-2 transition">
              <BookOpen size={24} />
              <span className="font-medium">New Diary</span>
            </button>
          </div>

          {/* Content Tabs */}
          <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex border-b border-gray-700 mb-6">
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "notes"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("notes")}
              >
                Recent Notes
              </button>
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "events"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("events")}
              >
                Upcoming Events
              </button>
              <button
                className={`pb-3 px-4 font-medium ${
                  activeTab === "media"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
            </div>

            {/* Notes Content */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{note.title}</h3>
                      <span className="text-xs text-gray-400">{note.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {note.preview}
                    </p>
                  </div>
                ))}
                <button className="w-full bg-gray-700 hover:bg-gray-600 rounded-xl p-3 text-center font-medium transition">
                  View All Notes
                </button>
              </div>
            )}

            {/* Events Content */}
            {activeTab === "events" && (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <span className="text-xs text-gray-400">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{event.location}</p>
                  </div>
                ))}
                <button className="w-full bg-gray-700 hover:bg-gray-600 rounded-xl p-3 text-center font-medium transition">
                  View All Events
                </button>
              </div>
            )}

            {/* Media Content */}
            {activeTab === "media" && (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <Image size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Media Yet</h3>
                <p className="text-gray-400 mb-6">
                  Upload images or videos to see them here
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition">
                  Upload Media
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Smart Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <FileText size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Smart Notes</h3>
              <p className="text-gray-400">
                Capture thoughts, ideas, and information with our intelligent
                note-taking system that organizes and connects related concepts.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-600 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <Link size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Link Storage</h3>
              <p className="text-gray-400">
                Save important links with automatic previews and categorization.
                Never lose track of valuable online resources again.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-600 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <Calendar size={24} className="text-green-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Event Tracking</h3>
              <p className="text-gray-400">
                Organize your schedule with smart event tracking that integrates
                with your notes and provides timely reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <BrainCircuit size={24} className="text-blue-400" />
              <h1 className="text-xl font-bold">Vrain</h1>
            </div>

            <div className="text-gray-400 text-sm">
              © 2025 codextarun.xyz. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
