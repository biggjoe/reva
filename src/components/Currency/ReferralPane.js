import React from "react";
import FontAwesome from "react-fontawesome";
const ReferralPane = (props) => {
  const { ref_data,
    fetching_referee,
    referee_fetched, } = props;
  return (
    <React.Fragment>
      {referee_fetched &&(
      <div className="text-start pt0">
        <div className="input iconed">
          <label> Referred by</label>
          {ref_data?.ref_ran && ref_data.ref_found === true && (<>
            <div className="input-form-control success-input-border">
              <span className="color-success txt-sm">
                {`${ref_data.name}`}
              </span>
            </div>
            <span className="input-icon">
                <FontAwesome
                  name={`user-circle`}
                  style={{ fontSize: "20px" }}
                  className="color-success"
                />
                </span></>
          )}
        </div>
      </div>)}
    </React.Fragment>
  );
};

export default ReferralPane;
