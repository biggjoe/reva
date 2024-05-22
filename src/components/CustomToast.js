import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import * as processHtml from "../services/processHtml";
const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomToast(props) {
  const val = props.data;
  const hider = val.hideduration ? val.hideduration : 3000;

  const { decodeHtml } = processHtml;
  return (
    <>
      <Snackbar
        open={val.onopen}
        onClose={val.onclose}
        autoHideDuration={hider}
        anchorOrigin={{
          vertical: val.vertical ? val.vertical : "top",
          horizontal: "center",
        }}
        TransitionComponent={TransitionUp}
        key={""}
      >
        <Alert
          onClose={val.onclose}
          severity={val.severity}
          sx={{ width: "100%" }}
        >
          <div
            className="py20 px10 txt-lg"
            dangerouslySetInnerHTML={{
              __html: decodeHtml(val.message),
            }}
          ></div>
        </Alert>
      </Snackbar>
    </>
  );
}
