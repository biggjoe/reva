import React from "react";

const CounterArea = () => {
  return (
    <React.Fragment>
      {/*--Start counter-area  --*/}
      <div className="counter-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <div className="main-title">
                  <h1>We ensure the most popular pro services</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-counter-box">
                <div className="counter-content">
                  <div className="connter-thumb">
                    <img src="/assets/images/template/archive.png" alt="" />
                  </div>
                  <div className="counter-title">
                    <h1>
                      <span className="aa">150</span>K<span>+</span>
                    </h1>
                    <h4>Registered Companies</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-counter-box">
                <div className="counter-content">
                  <div className="connter-thumb">
                    <img src="/assets/images/template/archive-1.png" alt="" />
                  </div>
                  <div className="counter-title">
                    <h1 className="come">
                      <span className="aa">155</span>M<span>+</span>
                    </h1>
                    <h4>Reserved Funding ($)</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-counter-box">
                <div className="counter-content">
                  <div className="connter-thumb">
                    <img src="/assets/images/template/archive-2.png" alt="" />
                  </div>
                  <div className="counter-title">
                    <h1 className="color">
                      <span className="aa">150</span>K<span>+</span>
                    </h1>
                    <h4>Active Total Users</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CounterArea;
