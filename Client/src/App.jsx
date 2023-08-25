import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { AdminDashboard } from "@/layouts";
import { UserContext } from './context/UserContext';
import '../src/style.css';
import { useContext } from "react";

function App() {
  const { role } = useContext(UserContext);
  console.log(role);



  return (
    <Routes>
      {role === 'admin' && (
        <Route path="/dashboard/*" element={<AdminDashboard />} />
      )}
      {role === 'owner' && (
        <Route path="/dashboard/*" element={<Dashboard />} />

      )}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
