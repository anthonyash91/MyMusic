import { useState } from "react";
import * as userService from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await userService.login(credentials);
      setUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
    Login with the credentials provided.<br /><br />
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
//             value={credentials.email}
            value="a@a.com"
            onChange={handleChange}
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
//             value={credentials.password}
            value="123456"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <div id="error">
            <button type="submit">Login</button>
            <span className="error-message">{error}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
