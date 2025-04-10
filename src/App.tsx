import Layout from "./pages/dashboard";
import AuthLayout from "./pages/auth";
import { Routes, Route } from "react-router";
import NotFound from "./pages/invalidPage";
import LandingPage from "./pages/landingpage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Layout />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
