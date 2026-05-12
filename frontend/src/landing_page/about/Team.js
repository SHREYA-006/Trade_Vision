import React from "react";
function Team() {
  return (
    <div className="container">
      <div className="row text-center mb-5">
        <h1 className="mb-3 fs-3">Developer</h1>
      </div>
      <div className="row">
        <div className="col-6 text-center">
          <img
            src="images/ShreyaYadav.jpeg"
            alt="Nithin Kamath"
            style={{ borderRadius: "50%", width: "50%", marginBottom: "1.8em" }}
          ></img>
          <h5>Shreya Yadav</h5>
          <p>Computer Science Student | Aspiring Full Stack Developer</p>
        </div>
        <div
          className="col-4 text-muted mt-4 "
          style={{ lineHeight: "1.6", fontSize: "1em" }}
        >
          <p>
            I am a passionate computer science student with a strong interest in
            full-stack web development. I love building real-world projects that
            solve problems and simulate industry-level applications.
          </p>
          <p>
            Trade Vision is one of my key projects where I explored everything
            from backend APIs and database design to frontend UI and live data
            integration.
          </p>
          <p>Sports and reading books keeps me grounded.</p>
          <p>
            Connect on{" "}
            <a
              href="https://github.com/SHREYA-006"
              target="_blank"
              style={{ textDecoration: "None" }}
            >
              GitHub
            </a>{" "}
            /{" "}
            <a
              href="your-linkedin-url"
              target="_blank"
              style={{ textDecoration: "None" }}
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
