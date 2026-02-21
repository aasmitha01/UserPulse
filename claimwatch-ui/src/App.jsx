import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import NewAnalysis from "./pages/NewAnalysis";
import Result from "./pages/Result";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED APP */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="analysis" element={<NewAnalysis />} />
          <Route path="result" element={<Result />} />
        </Route>
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}