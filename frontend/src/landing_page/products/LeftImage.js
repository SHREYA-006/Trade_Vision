import React from "react";

function LeftImage({
  imgURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePaly,
  appStore,
}) {
  return (
    <div className="container mt-5 p-5">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-6 p-3">
          <img src={imgURL}  />
        </div>
        <div className="col-4 p-5">
          <h1 className="fs-3 p-2">{productName}</h1>
          <p className="p-2 text-muted">{productDescription}</p>
          <div className="p-2">
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              Try Demo<i class="fa-solid fa-arrow-right"></i>
            </a>
            <a
              href={learnMore}
              className="px-3"
              style={{ textDecoration: "none" }}
            >
              Learn More<i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="mt-2 p-2">
            <a href={googlePaly}>
              <img src="images/googlePlayBadge.svg" />
            </a>
            <a href={appStore} className="px-3">
              <img src="images/appstoreBadge.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImage;
