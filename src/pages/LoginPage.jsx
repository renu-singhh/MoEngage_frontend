import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_API}user/auth/login`,
        { email, password }
      );
      // console.log(response.data);
      localStorage.setItem("token", response.data.token);
      // Assuming response.data contains a success flag or user info
      navigate("/body", { state: { email: email } });
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="but">
          <button type="submit" className="link-button">
            Login
          </button>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
