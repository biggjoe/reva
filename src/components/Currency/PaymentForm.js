import React from "react";
import PromptLogin from "../PromptLogin";
import BuyModal from "../BuyModal";

import ConnectWalletButton from "../../components/ConnectWalletButton";
import FontAwesome from "react-fontawesome";
import HttpService from "../../services/HttpService";

export default function PaymentForm(props) {
  const {
    affiliate_data,
    ref_data,
    set_aff,
    set_ref,
    currency,
    handleCurrAmoutChange,
    allowance,
    purchaseWrite,
    purchaseIsLoading,
    currAmount,
    approveWrite,
    approveIsLoading,
    currErrorMessage,
    result,
    isLogged,
    launchBuy,
    bux_data,
  } = props;
  const iconsObjs = {
    bnb: "bnb.png",
    usdt: "usdt.png",
    eth: "eth.png",
  };

  return (
    <React.Fragment>
      <div className="vstack gap-2">
        ||{JSON.stringify(affiliate_data)}||
        <div className="text-start">
          <div className="input iconed">
            <label>Amount In {currency.toUpperCase()}</label>
            <span className="icon-box">
              <img
                src={`/images/coins/${iconsObjs[currency]}`}
                alt={`${iconsObjs[currency]} Icon`}
              />
            </span>
            <input
              type="number"
              className="input-form-control buy-input"
              placeholder={0}
              name="currAmount"
              value={currAmount}
              onChange={handleCurrAmoutChange}
              step="any"
            />
          </div>
          {currErrorMessage && (
            <p style={{ color: "red" }}>{currErrorMessage}</p>
          )}
        </div>
        <div className="text-start">
          <div className="input mb10">
            <label>Amount In XRV</label>
            <input
              type="number"
              className="input-form-control buy-input"
              placeholder={result}
              disabled
              readOnly
            />
          </div>
        </div>
        {isLogged && (
          <>
            <div className="text-center pb10">
              <button
                onClick={togAff}
                className={
                  show_code ? "button-link" : "button-link aff-normal aff-text"
                }
              >
                Apply affiliate code
              </button>
              {is_bonused && (
                <button
                  className="button-link aff-text aff-red"
                  onClick={removeBonus}
                >
                  Remove Affiliate code
                </button>
              )}
            </div>
            {show_code && (
              <div className="text-start pt10">
                <div className="input iconed togger">
                  <label>Affiliate Code</label>
                  <input
                    type="text"
                    name="affiliate-code"
                    className="input-form-control aff-border"
                    placeholder="Enter Affiliate Code"
                    onChange={handleBonusInput}
                  />
                  <span className="input-icon">
                    <FontAwesome name={`code`} />
                  </span>
                  <button
                    className="aff-togger input-togger"
                    disabled={loading}
                    onClick={applyBonus}
                  >
                    {loading && (
                      <span className="pr10">
                        <FontAwesome name="circle" />
                      </span>
                    )}
                    <span className="pl0">
                      {loading ? "applying..." : "Apply"}
                    </span>
                  </button>
                </div>
              </div>
            )}
            {currency !== "bnb" && (
              <>
                <div className="text-center">
                  {address ? (
                    <>
                      {allowance.toNumber() < currAmount ? (
                        <button
                          className="btn btn-b"
                          disabled={!approveWrite || approveIsLoading}
                          onClick={() => approveWrite()}
                        >
                          {approveIsLoading ? "Approving..." : "Approve"}
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-b"
                            disabled={!purchaseWrite || purchaseIsLoading}
                            onClick={() => purchaseWrite()}
                          >
                            {purchaseIsLoading ? "Buying..." : "Buy Now"}
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="cover-div">
                      <div
                        className="btn-div"
                        style={{ opacity: currAmount > 0 ? "1" : "0.3" }}
                      >
                        <ConnectWalletButton />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {currency === "bnb" && (
              <>
                <div className="text-center">
                  {address ? (
                    <>
                      {allowance.toNumber() < currAmount ? (
                        <button
                          className="btn btn-b"
                          disabled={!approveWrite || approveIsLoading}
                          onClick={() => approveWrite()}
                        >
                          {approveIsLoading ? "Approving..." : "Approve"}
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-b"
                            disabled={!purchaseWrite || purchaseIsLoading}
                            onClick={() => purchaseWrite()}
                          >
                            {purchaseIsLoading ? "Buying..." : "Buy Now"}
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="cover-div">
                      <div
                        className="btn-div"
                        style={{ opacity: currAmount > 0 ? "1" : "0.3" }}
                      >
                        <ConnectWalletButton />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
        {!isLogged && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <PromptLogin
              button_text="BUY TOKEN"
              button_class="buy_token_button"
              mode="custom"
              return_call={launchBuy}
              return_url="/"
              do_redirect={true}
            />
          </div>
        )}
      </div>
      <BuyModal data={bux_data} />
    </React.Fragment>
  );
}
