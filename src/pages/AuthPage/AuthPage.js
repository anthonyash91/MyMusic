import SignUpForm from "../../components/SignUpForm/SignupForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState, useEffect } from "react";
// import "./AuthPage.module.css";

export default function AuthPage(props) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_SPOTIFY_API_KEY}`,
      "X-RapidAPI-Host": "billboard3.p.rapidapi.com",
    },
  };

  const [billboard, setBillboard] = useState([]);
  const [showForm, setShowForm] = useState("Sign Up");

  const year = Math.floor(Math.random() * (2022 - 2000) + 2000);
  const month = Math.floor(Math.random() * (12 - 1 + 1));
  const day = Math.floor(Math.random() * (28 - 1 + 1));

  const getBillboard = async () => {
    try {
      const response = await fetch(
        `https://billboard3.p.rapidapi.com/billboard-200?date=${year}-${month}-${day}&range=1-100`,
        options
      );
      const data = await response.json();
      setBillboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBillboard();
  }, []);

  return (
    <>
      <div id="auth-page">
        {showForm === "Sign Up" ? (
          <>
            <LoginForm setUser={props.setUser} />
            Are you new?
            <span
              onClick={() => {
                setShowForm("Sign Up");
              }}
            >
              <b> Signup</b>
            </span>
            .
          </>
        ) : (
          <>
            <SignUpForm setUser={props.setUser} />
            Already signed up?
            <span
              onClick={() => {
                setShowForm("Login");
              }}
            >
              <b> Login</b>
            </span>
            .
          </>
        )}
      </div>
      <div id="auth-page-container">
        {billboard.length
          ? billboard.map((cover, i) => {
              return (
                <div
                  className="auth-album"
                  style={{
                    backgroundImage: "url(" + cover.image + ")",
                  }}
                  key={i}
                ></div>
              );
            })
          : ""}
      </div>
    </>
  );
}
