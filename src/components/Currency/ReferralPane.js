import { Tooltip } from "@mui/material";
import React from "react";
import FontAwesome from "react-fontawesome";
const ReferralPane = (props) => {
  console.log("refe::", props);
  const { ref_data, fetching_referee, referee_fetched, set_ref } = props;
  const reset_ref = () => {
    set_ref({
      ref_ran: 0,
      ref_found: false,
      id: null,
      referral_code: null,
      referral_user: null,
      email: null,
    });
  };
  return (
    <React.Fragment>
      {referee_fetched && (
        <div className="mb5">
          <div className="input iconed togger">
            <label>You are being referred by</label>
            {ref_data?.ref_ran && ref_data.ref_found === true && (
              <>
                <div className="input-form-control flex flex-row align-items-center success-input-border">
                  <span className="color-success txt-sm spacer">
                    {`${ref_data.referral_code}`}
                  </span>
                </div>
                <span className="input-icon">
                  <FontAwesome
                    name={`user-circle`}
                    style={{ fontSize: "20px" }}
                    className="color-success"
                  />
                </span>
                <span className="input-togger">
                  <Tooltip title={`Remove ${ref_data.referral_code}`}>
                    <button className="button-link" onClick={reset_ref}>
                      <FontAwesome name="close" className="color-red" />
                    </button>
                  </Tooltip>
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ReferralPane;
