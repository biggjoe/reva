import React from "react";
import Tooltip from "@mui/material/Tooltip";
import FontAwesome from "react-fontawesome";
const CopyText = ({ text, class_name }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(text)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="input  togger">
      <input
        type="text"
        className={`input-form-control  ${
          class_name ? class_name : "buy-input"
        }`}
        id="ref-link"
        value={text}
      />

      <span className="input-togger">
        <Tooltip title={isCopied ? "Copied!" : "Copy Link"}>
          <button className="button-link" onClick={handleCopyClick}>
            <FontAwesome name={`${isCopied ? "check" : "copy"}`} />
          </button>
        </Tooltip>
      </span>
    </div>
  );
};

export default React.memo(CopyText);
