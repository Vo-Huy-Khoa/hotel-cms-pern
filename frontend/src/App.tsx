import { Navigate, Route, Routes } from "react-router-dom";
import { Auth, Dashboard } from "./layouts";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
