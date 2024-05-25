import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Edit from "@mui/icons-material/Edit";
import PlaceHolder from "../../../components/PlaceHolder";
import  Search  from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Close from "@mui/icons-material/Close";
import  Grid  from "@mui/material/Grid";

const TransitionUp = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SiteList() {
  console.log("siteList renders");
const router = useRouter();
    const { decodeHtml, truncateWord } = processHtml;
    const [site, setSite] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        listsite();
      }, []);
    
      const listsite = () => {
        setLoading(true);
        setLoaded(false);
        HttpService.listSettings()
          .then(
            (result) => {
              console.log(result);
              if (Array.isArray(result.data)) {
                setSite(result.data);
              } else {
                setSite([]);
              }
            },
            (error) => {
              setSite([]);
            }
          )
          .finally(() => {
            setLoading(false);
            setLoaded(true);
          }); //fetch
      }; //doAjax
    
      const closePreview = () => {
        setPreview({ ...preview, onopen: false });
      };
      const [preview, setPreview] = React.useState({
        onopen: false,
        onclose: closePreview,
      });
    
      const togEdit = (i) => {
console.log(i)
        router.push(`/admin/site/edit/${i.id}`);
      };
  return (
    <React.Fragment><section className="dashboard-pane">
        <div className="container py30">
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
                    <Link href="/admin/site">Site Settings</Link>
                  </Breadcrumbs>
                  <h2>Site Settings</h2>
                </div>
              </div>
            </div>
      <Divider/>
            <Grid container spacing={0}>
              {site.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.field}>
                  <div>
                    {item.field !== "id" && (
                      <ListItem
                        disablePadding
                        divider={index < site.length - 1 ? true : false}
                        component={"div"}
                        secondaryAction={
                          <>
                            <Tooltip title="Edit Page">
                              <IconButton onClick={() => togEdit(item)}>
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          </>
                        }
                      >
                        <ListItemButton
                        onChange={() => togEdit(item)}>
                          <ListItemText
                            primary={
                              <h4 style={{ lineHeight: "1.2" }}>
                                {item.field || "-"}
                              </h4>
                            }
                            secondary={item.value || "-"}
                          ></ListItemText>
                        </ListItemButton>
                      </ListItem>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
            {loading && (
              <>
                <div className="pxy20 flex flex-column">
                  <PlaceHolder type="list" />
                  <Divider />
                </div>
              </>
            )}{" "}
          </Card>
        </div>
      </section>
      {preview.onopen && (
        <>
          <Dialog
            open={true}
            aria-labelledby={"Me"}
            id={"md-" + preview.data.id}
            TransitionComponent={TransitionUp}
          >
            <div className="flex flex-row align-items-center px10">
              <DialogTitle id={"label100"} sx={{ p: "10px" }}>
                <i className="fas fa-info-circle"></i> {preview.title || "Info"}
              </DialogTitle>

              <span className="spacer"></span>
              <IconButton onClick={preview.onclose()} color="warning">
                <Close />
              </IconButton>
            </div>
            <DialogContent sx={{ p: "0 20px 20px 20px", m: "0" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(preview.data.message),
                }}
              ></div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </React.Fragment>
  );
}
