import React from "react";

function CreateTicket() {
  return (
    <div className="p-5 mt-5" style={{background:"#f6f6f6"}}>
      <div className="row px-5">
        <div className="col">
          <h1>Support Portal</h1>
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          <button
            className="btn btn-primary fs-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            My Tickets
          </button>
        </div>
      </div>
      <div class="input-group flex-nowrap mt-4 px-5" style={{height:"3.5em"}}>
        <span class="input-group-text" id="addon-wrapping">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Eg: How I Open my account, How do i activate F&O... "
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
    </div>
  );
}

export default CreateTicket;
