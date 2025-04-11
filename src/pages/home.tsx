import {
  Calendar,
  FileText,
  Layout,
  Layers,
  Search,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center">
          <span className="font-bold text-xl">Vrain</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-black">
            Product
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Templates
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Resources
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Pricing
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left column with text */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                The happier workspace
              </h1>
              <p className="text-xl mb-6">
                Write. Plan. Collaborate. With a little help from AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
                  onClick={() => navigate("/auth")}
                >
                  Get Vrain free
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200">
                  Request a demo
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by teams at
                </p>
                <div className="flex flex-wrap items-center gap-8">
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Right column with image */}
            <div className="w-full md:w-1/2">
              <div className="bg-gray-100 rounded-lg h-80 md:h-96 flex items-center justify-center">
                <p className="text-gray-400">
                  Place for illustration or screenshot
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar/App Preview Section */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Browser-like top bar */}
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="flex-1"></div>
              </div>
            </div>

            {/* Calendar interface */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">January 2025</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <Search size={16} />
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-sm rounded">
                    Today
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    &lt;
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    &gt;
                  </button>
                </div>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                <div className="text-gray-500">Su</div>
                <div className="text-gray-500">Mo</div>
                <div className="text-gray-500">Tu</div>
                <div className="text-gray-500">We</div>
                <div className="text-gray-500">Th</div>
                <div className="text-gray-500">Fr</div>
                <div className="text-gray-500">Sa</div>

                {/* First week */}
                <div className="p-2 text-gray-400">31</div>
                <div className="p-2">1</div>
                <div className="p-2">2</div>
                <div className="p-2">3</div>
                <div className="p-2">4</div>
                <div className="p-2">5</div>
                <div className="p-2">6</div>

                {/* Second week */}
                <div className="p-2">7</div>
                <div className="p-2">8</div>
                <div className="p-2">9</div>
                <div className="p-2">10</div>
                <div className="p-2">11</div>
                <div className="p-2">12</div>
                <div className="p-2">13</div>

                {/* Third week */}
                <div className="p-2">14</div>
                <div className="p-2">15</div>
                <div className="p-2 bg-blue-100 rounded">16</div>
                <div className="p-2">17</div>
                <div className="p-2">18</div>
                <div className="p-2">19</div>
                <div className="p-2">20</div>
              </div>

              {/* Events display */}
              <div className="border-t pt-4">
                <div className="flex mb-4">
                  <div className="w-16 text-xs text-gray-500 pt-1">9:00 AM</div>
                  <div className="flex-1">
                    <div className="bg-blue-100 text-blue-800 p-2 rounded mb-2 text-sm">
                      Team Sync Meeting
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-16 text-xs text-gray-500 pt-1">
                    11:00 AM
                  </div>
                  <div className="flex-1">
                    <div className="bg-green-100 text-green-800 p-2 rounded mb-2 text-sm">
                      Project Review
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-16 text-xs text-gray-500 pt-1">2:00 PM</div>
                  <div className="flex-1">
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm">
                      Team Lunch
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="border-t border-gray-200 py-3 px-4">
              <div className="flex justify-around">
                <div className="flex flex-col items-center text-gray-600 text-xs">
                  <Layout size={16} className="mb-1" />
                  <span>Wikis</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 text-xs">
                  <FileText size={16} className="mb-1" />
                  <span>Docs</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 text-xs">
                  <Layers size={16} className="mb-1" />
                  <span>Projects</span>
                </div>
                <div className="flex flex-col items-center text-blue-500 text-xs">
                  <Calendar size={16} className="mb-1" />
                  <span>Calendar</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 text-xs">
                  <Users size={16} className="mb-1" />
                  <span>Teams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            All you need in one place
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText size={20} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized Docs</h3>
              <p className="text-gray-600">
                Create, share and collaborate on documents with your team in
                real-time.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Layers size={20} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Projects & Tasks</h3>
              <p className="text-gray-600">
                Manage projects, assign tasks, and track progress all in one
                workspace.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
              <p className="text-gray-600">
                Plan your schedule, set reminders, and never miss important
                meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams who use Vrain to collaborate more
            effectively.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600">
              Get Vrain free
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200">
              Schedule a demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2025 Vrain, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-black">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
