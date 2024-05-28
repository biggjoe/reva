import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../CustomModal";

const PagesNew = () => {
  let navigate = useRouter();
  let [page, setPage] = React.useState({
    title: "",
    description: "",
    slug: "",
  });
  let [title, setTitle] = React.useState("");
  let [slug, setSlug] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [meta_keyword, setKeyword] = React.useState("");
  let [meta_description, setMetaDescription] = React.useState("");
  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "New Page",
    message: "",
  });

  React.useEffect(() => {}, []);

  const onHtmlChange = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    setLoading(true);
    HttpService.createPages({
      title: title,
      description: description,
      meta_keyword: meta_keyword,
      meta_description: meta_description,
      slug: slug,
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
  const handleTitleChange = React.useCallback(
    (e) => {
      setTitle(e.target.value);
      let newText = ripString(e.target.value);
      setSlug(newText);
    },
    [slug, title]
  );

  const ripString = (string) => {
    let text = string
      .toString()
      .toLowerCase()
      .replace(" ", "-")
      .replaceAll([" ", "'", "`", "--", " "], ["", "-", "-", "-", ""]);
    /*.replace("", "-")
      .replace("", "")
      .replace('"', "")
      .replace('"', "")
      .replace("'", "-")
      .replace("", "-")*/ return text;
  };

  return (
    <React.Fragment>
      <div className=" pxy20">
        <div className={loading ? " input iconed " : " input "}>
          <label>Page Title</label>
          <input
            type="text"
            className="input-form-control"
            name="title"
            onChange={handleTitleChange}
            placeholder={"Page Title "}
          />
        </div>
        <div className={loading ? " input iconed " : " input "}>
          <label>Slug</label>
          <input
            type="text"
            className="input-form-control"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={"slug"}
          />
        </div>
        <div className={loading ? " input iconed " : " input "}>
          <label>Meta Keywords</label>
          <input
            type="text"
            className="input-form-control"
            name="meta_keyword"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={"Meta keyword"}
          />
        </div>
        <div className={loading ? " input iconed " : " input "}>
          <label>Meta Description</label>
          <input
            type="text"
            className="input-form-control"
            name="meta_description"
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder={"Meta description"}
          />
        </div>

        <div className="mb10 input">
          <label>Page Contents</label>
          <DefaultEditor
            className="input-form-control"
            value={description}
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
