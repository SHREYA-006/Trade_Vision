import React from "react";
import { useState } from "react";

function Hero() {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: "Account Opening",
      content: [
        "Resident individual",
        "Minor",
        "Non Resident Indian (NRI)",
        "Company, Partnership, HUF and LLP",
        "Glossary",
      ],
    },
    {
      title: "NRI Account",
      content: [
        "Your Profile",
        "Account modification",
        "Client Master Report (CMR) and Depository Participant (DP)",
        "Nomination",
        "Transfer and conversion of securities",
      ],
    },
    {
      title: "Kite",
      content: [
        "IPO",
        "Trading FAQs",
        "Margin Trading Facility (MTF) and Margins",
        "Charts and orders",
        "Alerts and Nudges",
        "General",
      ],
    },
    {
      title: "Funds",
      content: [
        "Add money",
        "Withdraw money",
        "Add bank accounts",
        "eMandates",
      ],
    },
    {
      title: "Console",
      content: [
        "Portfolio",
        "Corporate actions",
        "Funds statement",
        "Reports",
        "Profile",
        "Segments",
      ],
    },
    {
      title: "Coin",
      content: [
        "Mutual funds",
        "National Pension Scheme (NPS)",
        "Fixed Deposit (FD)",
        "Features on Coin",
        "Payments and Orders",
        "General",
      ],
    },
  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-5">
      <div className="col-8">
        {sections.map((section, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleSection(index)}
              className="btn btn-secondary"
              style={{
                width: "60vw",
                padding: "14px 20px",
                fontSize: "20px",
                textAlign: "left",
                display: "block",
                borderRadius: "0",
                backgroundColor: "#f6f6f6",
                color: "#333",
                border: "1px solid #e0e0e0",
              }}
            >
              {section.title}
            </button>

            {openIndex === index && (
              <div
                className="card card-body"
                style={{
                  width: "60vw",
                  marginTop: "0",
                }}
              >
                <ul style={{ marginBottom: "0", paddingLeft: "30px" }}>
                  {section.content.map((item, i) => (
                    <li key={i} style={{ marginBottom: "15px" }}>
                      <a
                        href=""
                        style={{ textDecoration: "none", fontSize: "18px" }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
