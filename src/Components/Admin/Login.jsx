import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, InputGroup } from "react-bootstrap";
import { supabase } from "../../supabase";
import { toast, ToastContainer } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import GoToTop from "../../GoToTop";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      toast.error(error.message);
    } else {
      setLoading(false);
      toast.success("Logged in successfully");

      navigate("/dashboard");
    }
  };
  return (
    <>
      <ToastContainer />
      <GoToTop />
      <div className="logindiv">
        <div className="container logincontainer">
          <div className="left-panel">
            <h1>LOGIN</h1>
          </div>
          <div className="right-panel">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                  <label for="email">Registered Email</label>
                  <input
                    type="email"
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="input-group">
                  <label for="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="password"
                    placeholder="********"
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="btn btn-primary w-100"
                >
                  {loading ? <>Loading. Please wait...</> : <>Login</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
