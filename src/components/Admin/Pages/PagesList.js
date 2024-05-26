import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as processHtml from "../../../services/processHtml";
import Edit from "@mui/icons-material/Edit";
import HttpService from "../../../services/HttpService";
import PlaceHolder from "../../PlaceHolder";
import { Search } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Close from "@mui/icons-material/Close";

export default function PagesList() {
  console.log("PagesList renders");
  const navigate = useRouter();
  const { decodeHtml, truncateWord } = processHtml;
  const [pages, setPages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  /*  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data]; */

  React.useEffect(() => {
    listPages();
  }, []);

  const listPages = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.listPages()
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (Array.isArray(result.data)) {
            setPages(result.data);
          } else {
            setPages([]);
          }
        },
        (error) => {
          setPages([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax
  const togEdit = (i) => {
    if (i === "home") {
      return navigate.push(`/admin/pages`);
    }
    return navigate.push(`/admin/pages/edit/${i.id}`);
  };

  const closePreview = () => {
    setPreview({ ...preview, onopen: false });
  };
  const [preview, setPreview] = React.useState({
    onopen: false,
    onclose: closePreview,
  });

  const launchPreview = (i) => {
    navigate.push(`/admin/pages/view/${i.id}`);
  };

  const launchNew = (i) => {
    return navigate.push(`/admin/pages/new`);
  };

  return (
    <React.Fragment>
      <div className="flex flex-row-resp align-items-center pxy20">
        <div className="flex flex-row align-items-center spacer">
          <h2>All Pages</h2>
        </div>

        <span>
          <Button variant="outlined" size="small" onClick={launchNew}>
            New
          </Button>
        </span>
      </div>
      <Divider />

      {pages.map((item, index) => (
        <ListItem
          disablePadding
          key={index}
          divider={index < pages.length - 1 ? true : false}
          component={"div"}
          secondaryAction={
            <>
              <Tooltip title="Edit Page">
                <IconButton onClick={() => togEdit(item)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Preview Page">
                <IconButton onClick={() => launchPreview(item)}>
                  <Search />
                </IconButton>
              </Tooltip>
            </>
          }
        >
          <ListItemButton>
            <ListItemText
              primary={<h4 style={{ lineHeight: "1.2" }}>{item.title}</h4>}
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      ))}

      {loading && (
        <div className="px20">
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
        </div>
      )}
    </React.Fragment>
  );
}
