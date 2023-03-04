import React from "react";

const CustomErrorPage = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12 mx-auto my-3">
            <div className="text-center">
              <h4 className="border-top-bottom d-inline-block px-3 text-10">
                500 error
              </h4>
            </div>
            <div className="text-center mt-5">
              <h1 className="text-15">We've got a problem</h1>
              <p className="text-6">
                There is a lot of reasons why this page is <span className="color-dark-blue">500</span>, <br /> Don't
                waste your time enjoy the look of it.
              </p>
              <button className="btn btn-dark btn-modern bg-dark-blue mt-3">Home</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomErrorPage;
