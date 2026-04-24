import React from "react";

function Brokerage() {
  return (
    <div className="container border-top p-5">
      <div className="row text-center">
        <div className="col">
          <a href="" style={{ textDecoration: "none" }}>
            <h4 className="fs-5">Brokerage Calculator</h4>
          </a>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "12px" }}
            className="text-muted mt-3"
          >
            <li>
              Call & trade and RMS auto-squareoff : Additional charges of ₹50 +
              GST per oreder
            </li>
            <li>Digital contract notes will be send via email</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract.Courier charges apply.{" "}
            </li>
            <li>
              For NRI account(non-PIS), 0.5% ₹100 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              For NRI account(PIS), 0.5% ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed oreder
            </li>
          </ul>
        </div>
        <div className="col">
          <a href="" style={{ textDecoration: "none" }}>
            <h4 className="fs-5">List of Charges</h4>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
