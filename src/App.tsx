import Layout from "./pages/dashboard";
import AuthLayout from "./pages/auth";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/dashboard" element={<Layout />} />
    </Routes>
  );
}
