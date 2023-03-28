import { Routes, Route, Navigate } from "react-router-dom";
import { Auth, Dashboard } from "./layouts";
import "./style.css";
function App() {
  const token = sessionStorage.getItem("token");
  return (
    <Routes>
      <Route
        path="*"
        element={
          token ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}

export default App;
