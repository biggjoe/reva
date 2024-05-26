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
import ButtonGroup from "@mui/material/ButtonGroup";
import Collapse from "@mui/material/Collapse";
import HtmlModal from "../../HtmlModal";
import CustomModal from "../../CustomModal";
import Delete from "@mui/icons-material/Delete";
import ConfirmModal from "../../ConfirmModal";
import FontAwesome from "react-fontawesome";
export default function ListWhitepaper() {
  const router = useRouter();
  const { decodeHtml, truncateWord } = processHtml;
  const [whitepaper, setWhitepaper] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "Edit whitepaper",
    message: "",
  });

  React.useEffect(() => {
    listwhitepaper();
  }, []);

  const listwhitepaper = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.listWhitepaper()
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result.data)) {
            setWhitepaper(result.data);
          } else {
            setWhitepaper([]);
          }
        },
        (error) => {
          setWhitepaper([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const togView = (index, state) => {
    console.log(index, state);
    const mutd = [...whitepaper];
    const item = (mutd[index]["is_togged"] = !mutd[index]["is_togged"]);
    setWhitepaper(mutd);
  };

  const togEdit = (i) => {
    return router.push(`/admin/whitepaper/edit/${i.id}`);
  };

  const launchNew = (i) => {
    return router.push(`/admin/whitepaper/new`);
  };

  const delete_whitepaper = (item) => {
    setLoading(true);
    setLoaded(false);
    HttpService.removeWhitepaper(item.id)
      .then(
        (resp) => {
          if (resp.status === 1) {
            setModal({ ...modal, onopen: true, message: resp.message });
          }
          setTimeout(() => {
            setDelModal({
              ...del_modal,
              onopen: false,
              onclose: closeDelModal,
            });
            setModal({ ...modal, onopen: false, onclose: closeModal });
          }, 3000);
        },
        (error) => {
          setModal({ ...modal, onopen: true, message: "Error" });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  };

  const closeDelModal = () => {
    setDelModal({ ...del_modal, onopen: false });
  };
  const [del_modal, setDelModal] = React.useState({
    onopen: false,
    onclose: closeDelModal,
    title: "Delete whitepaper",
    message: "",
    onaccept: "",
  });
  const launchDelete = (item) => {
    setDelModal({
      ...del_modal,
      id: item.id,
      message: "Are you sure you want to remove this whitepaper page?",
      onopen: true,
      onclose: closeDelModal,
      onaccept: delete_whitepaper,
    });
  };
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py30">
          {" "}
          <Card sx={{ borderRadius: "0" }}>
            <div className="page-head bg-grax">
              <div className="flex flex-row-resp">
                <div className="inline-block pxy20">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link href="/admin/dashboard">Dashboard</Link>
                    <Link href="/admin/whitepaper">Whitepaper</Link>
                  </Breadcrumbs>
                  <div className="flex flex-row align-items-center">
                    <h2>Whitepaper</h2>
                    <span className="spacer"></span>
                    <span>--</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row border-bottom align-items-center pxy10">
              <span className="spacer"></span>
              <span>
                <Button variant="outlined" size="small" onClick={launchNew}>
                  New
                </Button>
              </span>
            </div>
            {whitepaper.map((item, index) => (
              <ListItem
                disablePadding
                key={index}
                divider={index < whitepaper.length - 1 ? true : false}
                component={"div"}
              >
                <ListItemButton disableRipple>
                  <ListItemText
                    primary={
                      <div className="flex flex-row align-items-center">
                        <h4 className="spacer" style={{ lineHeight: "1.2" }}>
                          {item.title}
                        </h4>
                        <span>
                          <Tooltip title="Edit page">
                            <IconButton
                              size="medium"
                              onClick={() => togEdit(item)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remove page">
                            <IconButton
                              color="warning"
                              size="medium"
                              onClick={() => launchDelete(item)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </span>
                        <Tooltip
                          title={`${item.is_togged ? "Hide" : "Show"}  Answer`}
                        >
                          <IconButton
                            size="small"
                            onClick={() => togView(index, !item.is_togged)}
                          >
                            {item.is_togged ? (
                              <FontAwesome name="chevron-up" />
                            ) : (
                              <FontAwesome name="chevron-down" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    }
                    secondary={
                      <Collapse in={item.is_togged}>
                        <div className="bg-white pxy10 bordered">
                          {item.sub.map((itm, ind) => (
                            <div
                              key={itm.title}
                              className={`${
                                ind < item.sub.length - 1 ? "border-bottom" : ""
                              }`}
                            >
                              <div className="flex flex-row align-items-center">
                                <h5 className="spacer">{itm.title}</h5>
                                <span>
                                  <Tooltip title="Edit page">
                                    <IconButton
                                      size="small"
                                      onClick={() => togEdit(itm)}
                                    >
                                      <Edit />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Remove page">
                                    <IconButton
                                      color="warning"
                                      size="small"
                                      onClick={() => launchDelete(itm)}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Tooltip>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            {loading && (
              <div className="pxy20">
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
              </div>
            )}
          </Card>
        </div>
      </section>
      <CustomModal data={modal} />
      <ConfirmModal data={del_modal} loading={loading} />
    </React.Fragment>
  );
}
