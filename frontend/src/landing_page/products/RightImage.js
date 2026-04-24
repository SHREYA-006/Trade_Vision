import React from "react";

function RightImage({imgUrl, productName, productDescription, link, linkName}) {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-1"></div>
        <div className="col-4 p-5" >
          <h1 className="fs-4" style={{marginTop:"60px"}}>{productName}</h1>
          <p > {productDescription} </p>
          <a href={link} style={{ textDecoration: "none" }}>
            {" "}
            {linkName} <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col">
          <img src={imgUrl} />
        </div>
      </div>
    </div>
  );
}

export default RightImage;
