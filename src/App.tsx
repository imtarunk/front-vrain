import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AuthPage from "./pages/auth";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notes/:id" element={<NotePage />} />
    </Routes>
  );
}

export default App;
