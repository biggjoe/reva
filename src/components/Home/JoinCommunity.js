import Image from "next/image";
import React from "react";

const JoinCommunity = () => {
  return (
    <React.Fragment>
      {/*--Start service Area  --*/}
      <div className="service-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <div className="main-title">
                  <h1>Join the Reva Community</h1>
                </div>
                <div className="sub-title">
                  <p>
                    The collective wisdom of millions of investors is at your
                    fingertips. Learn, share your experience and join the
                    conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-service-box">
                <div className="service-content">
                  <div className="service-icon-img">
                    <img
                      className="community-image"
                      src="/assets/images/template/sa-1.png"
                      alt="Personalizes"
                    />
                  </div>
                  <div className="service-title">
                    <h3>Personalizes</h3>
                  </div>
                  <div className="service-discription">
                    <p>
                      Create your favorite investment collections and investors
                      feed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-box">
                <div className="service-content">
                  <div className="service-icon-img">
                    <img
                      className="community-image"
                      src="/assets/images/template/sa-3.png"
                      alt="Follow Profiles"
                    />
                  </div>
                  <div className="service-title">
                    <h3>Follow Profiles</h3>
                  </div>
                  <div className="service-discription">
                    <p>
                      Connect with the communities & individuals that matter the
                      most.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-box">
                <div className="service-content">
                  <div className="service-icon-img">
                    <img
                      className="community-image"
                      src="/assets/images/template/service-2.png"
                      alt="Watch Investors"
                    />
                  </div>
                  <div className="service-title">
                    <h3>Watch Investors</h3>
                  </div>
                  <div className="service-discription">
                    <p>
                      Follow the trail of top investors making moves on the
                      platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-service-box">
                <div className="service-content">
                  <div className="service-icon-img">
                    <img
                      className="community-image"
                      src="/assets/images/template/service-1.png"
                      alt="Notifications"
                    />
                  </div>
                  <div className="service-title">
                    <h3>Notifications</h3>
                  </div>
                  <div className="service-discription">
                    <p>
                      Never miss a beat, an update, a pulse, or a connection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-service-box">
                <div className="service-content">
                  <div className="service-icon-img">
                    <img
                      className="community-image"
                      src="/assets/images/template/sa-2.png"
                      alt="Posts & Replies"
                    />
                  </div>
                  <div className="service-title">
                    <h3>Posts & Replies</h3>
                  </div>
                  <div className="service-discription">
                    <p>Keep your followers and community in the know.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-service-box">
                <div className="service-content">
                  <div className="service-icon-img">
                    <img
                      className="community-image"
                      src="/assets/images/template/service-3.png"
                      alt="Signal your bullish or bearish sentiment"
                    />
                  </div>
                  <div className="service-title">
                    <h3>Reactions</h3>
                  </div>
                  <div className="service-discription">
                    <p>Signal your bullish or bearish sentiment.</p>
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

export default JoinCommunity;
