import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard } from "./layouts";
import "./style.css";

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
