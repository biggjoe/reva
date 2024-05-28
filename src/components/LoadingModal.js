import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingModal = (props) => {
  const { message, loading, open, onclose, mode, hide_exit } = props.data;
  const createMarkup = (text) => {
    return { __html: text };
  };
  return (
    <React.Fragment>
      {open && (
        <div className="high-modal">
          <div className="flex flex-row align-items-center">
            {loading && (
              <span className="pr10">
                <CircularProgress size={40} />
              </span>
            )}
            {mode !== "component" && (
              <div
                className="spacer"
                dangerouslySetInnerHTML={createMarkup(message)}
              />
            )}
            {mode === "component" && <>{message}</>}
            {!hide_exit && (
              <span className="pl5">
                <button className="button-link" onClick={() => onclose()}>
                  EXIT
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoadingModal;
