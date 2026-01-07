import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Video Call</h2>
        </div>
        <div className="navList">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="first">
          <h1>
            <span style={{ color: "#ff9839" }}>Connect</span>
            with your loved one
          </h1>
          <p>Cover a distance by video call</p>
          <div role="button">
            <Link
              to="hoem"
              style={{
                textDecoration: "none",
                background: "#ff9838",
                width: "fit-content",
                padding: "1rem",
                color: "white",
                borderRadius: "20px",
                marginTop: "1.9rem",
                fontSize: "25px",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="secand">
          <img src="/mobile.png" alt=""></img>
        </div>
      </div>
    </div>
  );
}
// import React from "react";
// function Landing() {
//   return <div>hello</div>;
// }

// export default Landing;
