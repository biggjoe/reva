import React from "react";

const TheCompany = () => {
  return (
    <React.Fragment>
      {/*-- Start fintech-about-section  --*/}
      <div className="fintech-about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="single_about">
                <div className="about_thumb">
                  <img src="assets/images/template/fintech_5.png" alt="" />
                </div>
                <div className="about_tmb bounce-animate2">
                  <img src="assets/images/template/fintech_6.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="single_about">
                <div className="section-title">
                  <div className="sub-title">
                    <h5>About Us</h5>
                  </div>
                  <div className="main-title">
                    <h1>The Company</h1>
                  </div>
                </div>
                <div className="about-discription">
                  <p>
                    Reva is an early-stage Wealth-tech startup
                    <br />
                    We believe that investing shouldn&apos;t be restricted to
                    local market opportunities only. So, we are creating an
                    ecosystem for investors to make investments across borders,
                    seamlessly.
                    <br />
                    We use the latest in financial innovation and blockchain
                    technology to build a new concept of investment application.
                  </p>
                </div>
                <div className="about-buttin">
                  <a href="#">
                    explore more <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TheCompany;
