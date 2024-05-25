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
import CustomModal from "../../CustomModal";
import { Title } from "@mui/icons-material";

const PagesEdit = (props) => {
  let navigate = useRouter();
  const {id}=props
  const isParam = id ? true : false;
  let [page, setPage] = React.useState({});
  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "Edit page",
  });

  const [detail, setDetail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
      getpage(id);
  }, []);

  const getpage = (id) => {
    setLoading(true);
    setLoaded(false);
    HttpService.getPagesDetails(id)
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 1) {
            setPage(result.data);
            setTitle(result.data.title);
            setDescription(result.data.description);
            setDetail(result.data.description);
          } else {
            setPage({});
          }
        },
        (error) => {
          setPage({});
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
    setLoading(true);
    setLoaded(false);
    console.log("SUBMITTING");
    HttpService.editPages({
      title: title,
      description: detail,
      id: id,
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
      console.log(e.target);
      setTitle(e.target.value);
    },
    [Title]
  );

  return (
    <React.Fragment>

            {loading && <PlaceHolder type="edit_page" />}

            {loaded && (
              <div className="pxy20">
                <div className={loading ? " input iconed " : " input "}>
                  <label>Page title</label>
                  <input
                    type="text"
                    className="input-form-control"
                    name="name"
                    disabled={loading}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={"page Title"}
                  />
                </div>

                <div className="mb10">
                  <DefaultEditor
                    className="input-form-control"
                    value={detail}
                    placeholder="Page Detail"
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
                  {loading ? "Working..." : " Edit page "}
                </Button>
              </div>
            )}
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default PagesEdit;
