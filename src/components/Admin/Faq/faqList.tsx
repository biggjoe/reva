import React from "react";
import Link from "next/link";import { useRouter } from "next/router";
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

export default function FaqList() {
  let navigate = useRouter();
  const { decodeHtml, truncateWord } = processHtml;
  const [faqs, setFaq] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "Edit Faq",
  });

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    listfaqs();
  }, []);

  const listfaqs = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.listFaq()
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result.data)) {
            setFaq(result.data);
          } else {
            setFaq([]);
          }
        },
        (error) => {
          setFaq([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const togView = (index, state) => {
    console.log(index, state);
    const mutd = [...faqs];
    const item = (mutd[index]["is_togged"] = !mutd[index]["is_togged"]);
    setFaq(mutd);
  };

  const togEdit = (i: any) => {
    return navigate.push(`/admin/faq/edit/${i.id}`);
  };

  const launchNew = (i: any) => {
    return navigate.push(`/admin/faq/new`);
  };

  const delete_faq = (item: any) => {
    setLoading(true);
    setLoaded(false);
    HttpService.removeFaq(item.id)
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
    title: "Delete Faq",
  });
  const launchDelete = (item: any) => {
    setDelModal({
      ...del_modal,
      id: item.id,
      message: "Are you sure you want to remove this FAQ?",
      onopen: true,
      onclose: closeDelModal,
      onaccept: delete_faq,
    });
  };
  return (
    <React.Fragment>
              <div className="flex flex-row-resp align-items-center pxy20">
                  <div className="flex flex-row align-items-center spacer">
                    <h2>All FAQs</h2>
                  </div>
            
              <span>
                <Button variant="outlined" size="small" onClick={launchNew}>
                  New
                </Button>
              </span>
            </div>
            <Divider/>
            {faqs.map((item: any, index) => (
              <ListItem
                disablePadding
                key={index}
                divider={index < faqs.length - 1 ? true : false}
                component={"div"}
              >
                <ListItemButton disableRipple>
                  <ListItemText
                    primary={
                      <div className="flex flex-row align-items-center">
                        <h4
                          className="spacer"
                          onClick={() => togView(index, !item.is_togged)}
                          style={{ lineHeight: "1.2" }}
                        >
                          {item.question}
                        </h4>

                        <Tooltip
                          title={`${item.is_togged ? "Hide" : "Show"}  Answer`}
                        >
                          <IconButton
                            size="small"
                            onClick={() => togView(index, !item.is_togged)}
                          >
                            {item.is_togged ? (
                              <FontAwesome name="chevron-up"/>
                            ) : (<FontAwesome name="chevron-down"/>
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    }
                    secondary={
                      <Collapse in={item.is_togged}>
                        <div className="flex flex-row border-bottom align-items-center pxy10">
                          <span className="spacer"></span>
                          <span>
                            <ButtonGroup>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => togEdit(item)}
                              >
                                <Edit />
                                Edit
                              </Button>
                              <Button
                                color="warning"
                                variant="outlined"
                                size="small"
                                onClick={() => launchDelete(item)}
                              >
                                <Delete />
                                Delete
                              </Button>
                            </ButtonGroup>
                          </span>
                        </div>

                        <div
                          className="properties-summary"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(item.answer),
                          }}
                        ></div>
                      </Collapse>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            {loading && (
            <div className="px20"><PlaceHolder type="list" />
            <Divider/><PlaceHolder type="list" />
            <Divider/><PlaceHolder type="list" />
            <Divider/><PlaceHolder type="list" />
            <Divider/><PlaceHolder type="list" />
            <Divider/><PlaceHolder type="list" />
            </div>)}
         
      <CustomModal data={modal} />
      <ConfirmModal data={del_modal} loading={loading} />
    </React.Fragment>
  );
}
