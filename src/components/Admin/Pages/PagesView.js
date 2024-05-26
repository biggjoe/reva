import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HttpService from "../../../services/HttpService";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Edit from "@mui/icons-material/Edit";
import * as processHtml from "../../../services/processHtml";
import { Description } from "@mui/icons-material";

const PagesView = (props) => {
  let router = useRouter();
  console.log("router::", router.query);
  const mode = router.query.mode;
  const id = mode[1];
  const { decodeHtml, truncateWord } = processHtml;
  const togEdit = () => {
    router.push(`/admin/pages/edit/${id}`);
  };

  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
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
            setTitle(result.data.title);
            setDescription(result.data.description);
            setDetail(result.data.description);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax
  return (
    <React.Fragment>
      <div
        className="flex flex-row border-bottom
            stickied
            align-items-center pxy10"
      >
        <h2 className="spacer">{title || "---"}</h2>
        <span>
          <ButtonGroup>
            <Button variant="outlined" size="small" onClick={togEdit}>
              <Edit />
              Edit
            </Button>
          </ButtonGroup>
        </span>
      </div>

      <div className="pxy20">
        <div
          dangerouslySetInnerHTML={{
            __html: decodeHtml(description),
          }}
        ></div>
      </div>
    </React.Fragment>
  );
};

export default PagesView;
