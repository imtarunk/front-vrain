import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AuthPage from "./pages/auth";
import NotePage from "./pages/NotePage";
import Home from "./pages/home";
import NotFound from "./pages/invalidPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notes/:id" element={<NotePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
