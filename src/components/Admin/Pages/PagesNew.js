import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DefaultEditor } from "react-simple-wysiwyg";
import * as processHtml from "../../../services/processHtml";
import Edit from "@mui/icons-material/Edit";
import HttpService from "../../../services/HttpService";
import PlaceHolder from "../../PlaceHolder";
import { Collapse } from "@mui/material";
import HtmlModal from "../../HtmlModal";
import useFetchFaqDetails from "../../../hooks/useFetchFaqDetails";
import CustomModal from "../../CustomModal";
import { Description } from "@mui/icons-material";

const PagesNew = () => {
  let navigate = useRouter();
  let [page, setPage] = React.useState({ title: "", description: "" });
  let [answer, setAnswer] = React.useState("");
  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "New Faq",
    message: "",
  });

  React.useEffect(() => {}, []);

  const onHtmlChange = (e) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    HttpService.postHeader("pages", {
      question: page.title,
      answer: page.description,
      mode: "add-page",
    })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 1) {
          setModal({ ...modal, onopen: true, message: resp.message });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleInputChange = React.useCallback(
    (e) => {
      console.log(e.target);
      const name = e.target.name;
      setPage({ ...page, [name]: e.target.value });
    },
    [page]
  );

  return (
    <React.Fragment>
      <div className=" pxy20">
        <div className={loading ? " input iconed " : " input "}>
          <label>Title</label>
          <input
            type="text"
            className="input-form-control"
            name="question"
            onChange={handleInputChange}
            placeholder={"Page Title "}
          />
        </div>

        <div className="mb10">
          <DefaultEditor
            className="input-form-control"
            value={answer}
            onChange={onHtmlChange}
          />
        </div>
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Working..." : " Add Page "}
        </Button>
      </div>
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default PagesNew;
