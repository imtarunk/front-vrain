import Layout from "./pages/dashboard";
import AuthLayout from "./pages/auth";
import { Routes, Route } from "react-router";
import NotFound from "./pages/invalidPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
      <Route path="/dashboard" element={<Layout />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
