import { useState } from "react";
import "../App.css";

 function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@event.com" && password === "admin123") {
      localStorage.setItem("admin_auth", "true");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            className="admin-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="admin-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="admin-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin