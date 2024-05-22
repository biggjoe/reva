import React from "react";
import useFetchSiteSettings from "../hooks/useFetchSiteSettings";
import Link from "next/link";

const Footer = () => {
  // const { settings } = useFetchSiteSettings();

  return (
    <React.Fragment>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="widgets-company-information">
                <div className="footer-logo">
                  <Link href="#">
                    <img src="images/logo.png" alt="" />
                  </Link>
                </div>
                <div className="footer-discription">
                  <p>
                    Dynamically procrastinate time functionalities virtual
                    resources. Continually cultivate
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <div className="row">
                <div className="col-lg-4">
                  <div className="single-footer">
                    <div className="footer-content">
                      <div className="footer-title">
                        <h3>Company</h3>
                      </div>
                      <ul>
                        <li>
                          <Link href="/about-us">About Us</Link>
                        </li>
                        <li>
                          <Link href="/contact-us">Contact Us</Link>
                        </li>{" "}
                        <li>
                          <Link href="/terms">Terms & Condition</Link>
                        </li>
                        <li>
                          <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-footer">
                    <div className="footer-content">
                      <div className="footer-title">
                        <h3>Resources</h3>
                      </div>
                      <ul>
                        <li>
                          <Link href="./#features">Products</Link>
                        </li>
                        <li>
                          <Link href="./#learn">Learn</Link>
                        </li>
                        <li>
                          <Link href="./#tokenized-assets">Tokenomics</Link>
                        </li>
                        <li>
                          <Link href="/whitepaper">Whitepaper</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-footer">
                    <div className="footer-content">
                      <div className="footer-title">
                        <h3>Social Media</h3>
                      </div>
                      <ul>
                        <li>
                          <a href="https://twitter.com/RevaFinanceHQ">
                            Facebook
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/RevaFinanceHQ">
                            X(Twitter)
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/revafinancehq/">
                            Instagram
                          </a>
                        </li>
                        <li>
                          <a href="t.me/revafinance">Telegram</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-title">
                  <h3>Copyright © 2023 Reva Technology</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
