import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SuperAdminDashboard from "./dashboards/SuperAdminDashboard";
import TenantAdminDashboard from "./dashboards/TenantAdminDashboard";
import UserDashboard from "./dashboards/UserDashboard";

const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // 🔒 Protect dashboard
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case "super_admin":
        return <SuperAdminDashboard />;

      case "tenant_admin":
        return <TenantAdminDashboard />;

      case "user":
        return <UserDashboard />;

      default:
        return <p>Unauthorized</p>;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <hr />

      {/* 🔥 Role-based dashboard */}
      {renderDashboard()}

      <br />

      <button
        onClick={() => {
          logoutUser();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
