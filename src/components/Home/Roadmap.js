import React from "react";

const Roadmap = () => {
  return (
    <React.Fragment>
      {/*-- Start brand Area  --*/}
      <div
        className="fintech-brand-section"
        id="roadmap"
        style={{ backgroundColor: "#081e4f" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <div className="main-white-title ">
                  <h1>Roadmap</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="tokenomics-container">
            <img src="/images/roadmap.png" alt="Roadmap" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Roadmap;
