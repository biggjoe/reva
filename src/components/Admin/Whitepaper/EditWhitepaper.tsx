import React from "react";
import Link from "next/link";import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { DefaultEditor } from "react-simple-wysiwyg";
import HttpService from "../../../services/HttpService";
import PlaceHolder from "../../PlaceHolder";
import useFetchWhitepaperCategories from "../../../hooks/useFetchWhitepaperCategories";

import CustomModal from "../../CustomModal";

const EditWhitepaper = (props) => {
  const{id}=props
  let router =useRouter();
  const isParam = id ? true : false;
  let [whitepaper, setWhitepaper] = React.useState({});
  const { whitepaper_categories } = useFetchWhitepaperCategories();
  let [loading, setLoading] = React.useState(false);
  let [loaded, setLoaded] = React.useState(false);
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "Edit Whitepaper",
  });

  const [title, setTitle] = React.useState("");
  const [cat_id, setCatId] = React.useState("");
  const [description, setDescription] = React.useState("");
  //let [id, setId] = React.useState(false);

  React.useEffect(() => {
      getWhitepaper(id);
  }, []);

  const getWhitepaper = (id) => {
    setLoading(true);
    setLoaded(false);
    HttpService.getWhitepaperDetails(id)
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 1) {
            setWhitepaper(result.data);
            setTitle(result.data.title);
            setDescription(result.data.description);
            setCatId(result.data.cat_id);
            //setId(result.data.id);
            setPreview(
              process.env.NEXT_PUBLIC_SERVER_DOMAIN + result.data.banner_url
            );
          } else {
            setWhitepaper({});
          }
        },
        (error) => {
          setWhitepaper({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const onHtmlChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    console.log("SUBMITTING");
    setLoading(true);
    setLoaded(false);

    const formData = new FormData();
    formData.append("title", whitepaper?.title);
    formData.append("cat_id", whitepaper?.cat_id);
    formData.append("id", id);
    formData.append("banner", file);
    formData.append("description", description);
    formData.append("is_new_file", new_file);
    HttpService.editWhitepaper(
      formData /* {
      title: title,
      description: description,
      cat_id: cat_id,
      id: id,
      mode: "edit-whitepaper",
    } */
    )
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
      setDescription(e.target.value);
    },
    [description]
  );

  const [file, setFile] = React.useState(null);
  const [new_file, setNewFile] = React.useState(0);
  const [preview_image, setPreview] = React.useState(null);
  const handleFileChange = (e) => {
    const formData = new FormData();
    let fname = e.target.name;
    let flx = e.target.files[0];
    formData.append("file", flx);
    console.log(flx, formData);
    setFile(flx);
    console.log(flx);
    setPreview(URL.createObjectURL(flx)); // Would see a path?
    setNewFile(1);
  };

  return (
    <React.Fragment>
      <div className="pb20">
<h2>{whitepaper.title}</h2>
</div>
            {loading && <PlaceHolder type="edit_page" />}

            {loaded && (
              <div className="py30 px20">
                <div className={loading ? " input iconed " : " input "}>
                  <label>Title</label>
                  <input
                    type="text"
                    className="input-form-control"
                    name="title"
                    disabled={loading}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={"Title "}
                  />
                </div>

                <div className={loading ? " input iconed " : " input "}>
                  <label>Category</label>
                  <select
                    className="input-form-control"
                    onChange={(e) => setCatId(e.target.value)}
                    name="cat_id"
                    defaultValue={cat_id}
                  >
                    <option value="0">Main Category</option>
                    {whitepaper_categories.map((itm, ind: number) => (
                      <option value={itm.id} key={itm.id}>{itm.title}</option>
                    ))}
                  </select>
                </div>

                <div className="banner-section">
                  {preview_image && (
                    <div className="image_preview">
                      <img
                        className=""
                        src={preview_image}
                        alt="preview Image"
                      />
                    </div>
                  )}
                  <div
                    className={
                      loading ? " input iconed mt20 pt10" : " input mt20 pt10"
                    }
                  >
                    <label>Attach Page Banner</label>
                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      onChange={handleFileChange}
                      placeholder={"details firstname "}
                    />
                  </div>
                </div>

                <div className="mb10">
                  <DefaultEditor
                    className="form-control"
                    value={description}
                    disabled={loading}
                    placeholder="Page Details"
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
                  {loading ? "Working..." : " Edit Whitepaper "}
                </Button>
              </div>
            )}
      <CustomModal data={modal} />
    </React.Fragment>
  );
};

export default EditWhitepaper;
