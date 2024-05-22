import React from "react";
import FontAwesome from "react-fontawesome";
const AffiliatePane = (props) => {
  const {
    affiliate_data,
    show_init,
    show_code,
    togAff,
    bonus_code,
    handleBonusInput,
    applyBonus,
    removeBonus,
    loading,
    fetching_bonus,
    bonus_fetched
  } = props;
  return (
    <React.Fragment>
      {!show_init && !show_code && (
        <div className="text-center pb10">
          <button
            onClick={togAff}
            className={
              show_code
                ? "button-link  aff-text color-red"
                : "button-link aff-text"
            }
          >
            {show_code ? "Hide Code" : "Apply affiliate code"}
          </button>
        </div>
      )}
      {(show_init || show_code) && (
        <div className="text-start pt0">
          <div className="input iconed togger">
            <label>Affiliate Code</label>
            {affiliate_data?.bonus_ran &&
              affiliate_data.bonus_found === true &&
              affiliate_data.is_bonus_active && (
                <div className="input-form-control success-input-border">
                  <span className="color-success">
                    {`${affiliate_data.percentage}%`} bonus to be applied
                  </span>
                </div>
              )}
            {affiliate_data?.bonus_ran &&
              affiliate_data.bonus_found === true &&
              !affiliate_data.is_bonus_active && (
                <div className="input-form-control aff-border">
                  <span className="aff-color">Code is no longer active</span>
                </div>
              )}

            {affiliate_data?.bonus_ran &&
              affiliate_data.bonus_found === false && (
                <div className="input-form-control error-input-border">
                  <span className="color-error">Invalid Code</span>
                </div>
              )}
            {!affiliate_data?.bonus_ran && (
              <input
                type="text"
                name="affiliate-code"
                className="input-form-control aff-border"
                placeholder="Enter Affiliate Code"
                onChange={handleBonusInput}
              />
            )}
            <span className="input-icon">
              {affiliate_data?.bonus_ran &&
                affiliate_data.bonus_found === true &&
                affiliate_data.is_bonus_active && (
                  <FontAwesome
                    name={`check-circle`}
                    style={{ fontSize: "30px" }}
                    className="color-success"
                  />
                )}

              {affiliate_data?.bonus_ran &&
                affiliate_data.bonus_found === true &&
                !affiliate_data.is_bonus_active && (
                  <FontAwesome
                    name={`info-circle`}
                    style={{ fontSize: "30px" }}
                    className="aff-color"
                  />
                )}
              {affiliate_data?.bonus_ran &&
                affiliate_data.bonus_found === false && (
                  <FontAwesome
                    name={`exclamation-triangle`}
                    className="color-red"
                  />
                )}
              {!affiliate_data?.bonus_ran && <FontAwesome name={`code`} />}
            </span>
            {!affiliate_data?.bonus_ran && (
              <button
                className="aff-togger input-togger normal"
                disabled={fetching_bonus}
                onClick={applyBonus}
              >
                {loading && (
                  <span className="pr10">
                    <FontAwesome name="circle" />
                  </span>
                )}
                <span className="pl0">{fetching_bonus ? "applying..." : "Apply"}</span>
              </button>
            )}

            {affiliate_data?.bonus_ran && (
              <button
                title="Remove Affiliate Bonus"
                className="aff-togger input-togger remove"
                disabled={loading}
                onClick={() => {
                  removeBonus();
                  togAff();
                }}
              >
                <span className="pr0">
                  <FontAwesome name="trash" />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(AffiliatePane);
