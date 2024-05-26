import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
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

const FaqEdit = (props) => {
  const { id } = props;
  const isParam = id ? true : false;
  let [faq, setFaq] = React.useState({ question: "", answer: "", mode: "" });
  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    message: "",
    title: "Edit Faq",
  });

  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  React.useEffect(() => {
    getfaq(id);
  }, []);

  const getfaq = (id) => {
    setLoading(true);
    setLoaded(false);
    HttpService.getFaqDetails(id)
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 1) {
            setFaq(result.data);
            setQuestion(result.data.question);
            setAnswer(result.data.answer);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const onHtmlChange = (e) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    setLoading(true);
    setLoaded(false);
    HttpService.editFaq({
      answer: answer,
      question: question,
      id: id,
      mode: "edit-faq",
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
        setLoaded(true);
      });
  };
  const handleInputChange = React.useCallback(
    (e) => {
      console.log(e.taget);
      setQuestion(e.target.value);
    },
    [question]
  );

  return (
    <React.Fragment>
      <div className="py20">
        <h2>{faq.question}</h2>
      </div>
      {loading && <PlaceHolder type="edit_page" />}

      {loaded && (
        <div className=" pxy20">
          <div className={loading ? " input iconed " : " input "}>
            <label>Question</label>
            <input
              type="text"
              className="input-form-control"
              name="question"
              disabled={loading}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={"FAQ Question "}
            />
          </div>

          <div className="mb10">
            <DefaultEditor
              className="form-control"
              value={answer}
              disabled={loading}
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
            {loading ? "Working..." : " Edit FAQ "}
          </Button>
        </div>
      )}
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default FaqEdit;
