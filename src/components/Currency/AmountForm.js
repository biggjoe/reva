import React from "react";
import FontAwesome from "react-fontawesome";

export default function AmountForm(props) {
  const { curr, result, currAmount, handleCurrAmountChange, currErrorMessage } =
    props;
  const iconsObjs = {
    bnb: "bnb.png",
    usdt: "usdt.png",
    eth: "eth.png",
  };

  return (
    <React.Fragment>
      <div className="text-start">
        <div className="input   togger">
          <label>Amount In {curr.toUpperCase()}</label>
          <input
            type="number"
            className="input-form-control  no-scroll"
            placeholder={`Enter ${curr.toUpperCase()} amount...`}
            name="currAmount"
            value={currAmount}
            onChange={handleCurrAmountChange}
            step="any"
          />

          <span className="input-togger flex flex-col color-black">
            <span className="txt-xxsm text-right"> Amount in $XRV</span>
            <span className="txt-xsm dixer text-right">
              <span className="grayed">$XRV</span>
              {`${result || `0.00`}`}
            </span>
          </span>
        </div>
        {currErrorMessage && (
          <div className="text-center flex flex-col badge py10 badge-warning">
            <span>
              <FontAwesome name="exclamation-triangle" /> {currErrorMessage}
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
