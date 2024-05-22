import React from "react";
import {
  Slide,
  Toolbar,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Dialog,
  LinearProgress,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props) => {
  const val = props.data;
  const action_loading = props.loading;
  console.log(props);
  return (
    <>
      <Dialog
        fullScreen={val.fullwidth || false}
        maxWidth={val.maxwidth || "400px"}
        TransitionComponent={Transition}
        open={val.onopen}
        onClose={val.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <Toolbar
          sx={{
            p: "20px 10px 0 20px !important",
            minHeight: "60px !important",
          }}
        >
          <IconButton edge="start" color="inherit" aria-label="close">
            <InfoOutlined />
          </IconButton>
          <Typography sx={{ ml: "0px", flex: 1 }} variant="h6" component="div">
            {val.title}
          </Typography>
        </Toolbar>
        <DialogContent>
          <section>
            <div
              className="pxy0 txt-lg"
              dangerouslySetInnerHTML={{ __html: val.message }}
            ></div>
            <div className="modal-width"> {val.loading_text}</div>
            {action_loading && (
              <div className="py20">
                <LinearProgress />
              </div>
            )}
          </section>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={action_loading}
            onClick={val.onclose}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            disabled={action_loading}
            onClick={() => val.onaccept(val)}
            color="primary"
          >
            {action_loading ? "Working..." : "Yes, Proceed"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(ConfirmModal);
