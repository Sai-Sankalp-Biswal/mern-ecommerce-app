import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forms.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('${API_BASE_URL}/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ STORE TOKEN + ROLE
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      setIsLoggedIn(true);

      const redirect =
        localStorage.getItem("redirectAfterLogin") || "/products";

      localStorage.removeItem("redirectAfterLogin");
      navigate(redirect);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card center-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
