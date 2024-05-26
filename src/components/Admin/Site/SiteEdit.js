import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../CustomModal";
import * as processHtml from "../../../services/processHtml";

const SiteEdit = (props) => {
  console.log("Site Edit props::", props);
  const { id } = props;
  const { decodeHtml, truncateWord } = processHtml;

  let [meta, setMeta] = React.useState({
    field: "",
    value: "",
  });
  let [col, setCol] = React.useState("");
  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {}, []);

  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "Edit page",
    message: "",
  });

  const [detail, setDetail] = React.useState("");
  const [setting, setSetting] = React.useState(null);

  React.useEffect(() => {
    getSetting(id);
  }, []);

  const getSetting = (id) => {
    setLoading(true);
    setLoaded(false);
    console.log("fectch id:", id);
    HttpService.getSettings(id)
      .then(
        (result) => {
          console.log(result);
          if (result.status === 1) {
            setSetting(result.data);
            setMeta(result.data);
            setCol(result.data.value);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const onHtmlChange = (e) => {
    setDetail(e.target.value);
    console.log(detail);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    setLoading(true);
    setLoaded(false);
    const load = { id: setting.id, field: setting.field, value: col };
    console.log(load);
    HttpService.editSetting(load)
      .then((resp) => {
        console.log(resp);
        setModal({ ...modal, onopen: true, message: resp.message });
      })
      .catch((err) => {
        setModal({ ...modal, onopen: true, message: err.message });
      })
      .finally(() => {
        setLoading(false);
        setLoaded(true);
        setTimeout(() => {
          setModal({ ...modal, onopen: false });
        }, 6000);
      });
  };
  const handleInputChange = React.useCallback(
    (e) => {
      /*      console.log(e.taget);
      const name = e.target.name;
      setMeta({ ...meta, [name]: e.target.value });
      console.log(meta);  */

      setCol(e.target.value);
    },
    [col, setting]
  );

  const html = [
    "signup_message",
    "signup_message_subject",
    "low_credit_limit_message",
    "low_credit_limit_message_subject",
    "low_credit_limit_announcement",
  ];

  return (
    <React.Fragment>
      <h2>{setting?.field}</h2>
      <div className="py20">
        {!html.includes(setting?.field) && (
          <>
            <div className={loading ? " input iconed " : " input "}>
              <label>{setting?.field}</label>
              <input
                type="text"
                className="input-form-control"
                disabled={loading}
                name="column"
                value={col}
                onChange={(e) => setCol(e.target.value)}
                placeholder={"Enter Value"}
              />
            </div>
          </>
        )}
        {html.includes(setting?.field) && (
          <>
            <div className="mb10">
              <DefaultEditor
                className="input-form-control"
                value={decodeHtml(setting?.value)}
                onChange={onHtmlChange}
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Working..." : " Edit page "}
        </Button>
      </div>
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default SiteEdit;
