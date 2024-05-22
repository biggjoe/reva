import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <section className="py-10 py-lg-15">
        <div className="container">
          <div className="flex flex-col py30">
            <div className="inline-flex flex-col align-items-center">
              <div className="text-center">
                <Image
                  src="assets/images/error-blue.svg"
                  height={0}
                  width={0}
                  style={{ width: "auto", height: 60 }}
                  alt="Error 404"
                  className="img-fluid mb-10"
                />
                <h1 className="mb30">Oops! Page Not Found.</h1>
                <p className="mb-8">
                  The page you are looking for is not available or has been
                  moved. Try a different page or go to the homepage with the
                  button below.
                </p>
                <Link href="/" className="btn btn-primary">
                  Go to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
