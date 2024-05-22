import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as processHtml from "../services/processHtml";
import HttpService from "../services/HttpService";
import Collapse from "@mui/material/Collapse";
import PlaceHolder from "../components/PlaceHolder";
import { Card, Typography } from "@mui/material";
import FontAwesome from "react-fontawesome";
import PageTop from "../components/PageTop";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Faq = () => {
  const { decodeHtml, truncateWord } = processHtml;
  const [faqs, setFaq] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

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
  return (
    <React.Fragment>
      <Header />
      <section className="dashboard-pane">
        <div className="container">
          <PageTop
            page_data={{ title: "Frequently Asked Questions" }}
            loaded_page={loaded}
            loading_page={loading}
          />

          <section className="pxy20">
            {faqs.map((item, index) => (
              <ListItem
                disablePadding
                key={index}
                divider={index < faqs.length - 1 ? true : false}
                component={"section"}
              >
                <ListItemButton
                  disableRipple
                  onClick={() => togView(index, !item.is_togged)}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <div className="flex flex-row align-items-center">
                        <strong
                          className="spacer"
                          style={{ lineHeight: "1.2", fontSize: "19px" }}
                        >
                          {item.question}
                        </strong>
                        <Tooltip
                          title={`${item.is_togged ? "Hide" : "Show"}  Answer`}
                        >
                          <IconButton
                            size="small"
                            onClick={() => togView(index, !item.is_togged)}
                          >
                            <FontAwesome
                              name={`${
                                item.is_togged ? "chevron-up" : "chevron-down"
                              }`}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    }
                    secondary={
                      <Collapse in={item.is_togged}>
                        <Typography
                          type="body"
                          className="properties-summary"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtml(item.answer),
                          }}
                        ></Typography>
                      </Collapse>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            {loading && <PlaceHolder type="horizontal_list" />}
          </section>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Faq;
