import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

const PlaceHolder = (props) => {
  const { type, max_grid } = props;
  return (
    <React.Fragment>
      {type === "edit_page" && (
        <div className="pxy20">
          <Skeleton
            sx={{ borderRadius: "6px", marginBottom: "15px" }}
            variant="rectangular"
            width={"100%"}
            height={48}
          />
          <Skeleton
            sx={{ borderRadius: "6px", marginBottom: "15px" }}
            variant="rectangular"
            width={"100%"}
            height={230}
          />
          <Skeleton
            sx={{ borderRadius: "6px", marginBottom: "10px" }}
            variant="rectangular"
            width={80}
            height={40}
          />
        </div>
      )}
      {type === "dash" && (
        <>
          <Grid container spacing={2}>
            {[1, 2, 3].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton
                  sx={{ borderRadius: "15px", marginBottom: "10px" }}
                  variant="rectangular"
                  width={"100%"}
                  height={160}
                />
              </Grid>
            ))}
          </Grid>
          <div className="py10"></div>
          <Grid container spacing={2}>
            {[1, 2].map((item, index) => (
              <Grid item xs={12} sm={12} md={6} key={item}>
                <Skeleton
                  sx={{ borderRadius: "15px", marginBottom: "10px" }}
                  variant="rectangular"
                  width={"100%"}
                  height={200}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {type === "list" && (
        <Box
          sx={{
            display: "flex",
            marginBottom: "10px",
            marginTop: "5px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ flexGrow: 0 }}>
            <>
              <Skeleton variant="circular" width={40} height={40} />
            </>
          </Box>
          <Box sx={{ flexGrow: 1, marginLeft: "5px" }}>
            <>
              <Skeleton variant="text" sx={{ fontSize: "1.4rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "0.8rem" }} />
            </>
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "6px" }}>
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "40px" }}
              />
            </>
          </Box>
        </Box>
      )}

      {type === "gallery-content" && (
        <Box
          sx={{
            display: "flex",
            margin: "20px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            sx={{ borderRadius: "4px", marginBottom: "7px" }}
            variant="rectangular"
            width={"100%"}
            height={25}
          />
          <Skeleton
            sx={{ borderRadius: "4px", marginBottom: "15px" }}
            variant="rectangular"
            width={"100%"}
            height={14}
          />

          <Skeleton
            sx={{ borderRadius: "4px" }}
            variant="rectangular"
            width={"100%"}
            height={320}
          />
        </Box>
      )}

      {type === "profile" && (
        <Box
          sx={{
            display: "flex",
            marginBottom: "10px",
            padding: "30px",
            marginTop: "5px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ flexGrow: 0, marginRight: "20px" }}>
            <>
              <div style={{ marginBottom: "20px" }}>
                <Skeleton variant="circular" width={170} height={170} />
              </div>
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
            </>
          </Box>
          <Box sx={{ flexGrow: 1, paddingLeft: "35px" }}>
            <div style={{ padding: "20px" }}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.1rem", marginBottom: "10px" }}
              />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <div className="py30"></div>
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.1rem", marginBottom: "10px" }}
              />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
            </div>
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "6px" }}></Box>
        </Box>
      )}

      {type === "horizontal_list" && (
        <Box sx={{ padding: "5px" }}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Skeleton
              key={item}
              sx={{
                borderRadius: "1px",
                display: "block",
                borderBottom: "1px solid #ccc",
              }}
              variant="rectangular"
              height={60}
              width={"100%"}
            />
          ))}
        </Box>
      )}
      {type === "side_nav_list" && (
        <Box sx={{ padding: "5px" }}>
          {[1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 1, 14, 15].map((item, index) => (
            <Skeleton
              key={item}
              sx={{
                borderRadius: "3px",
                display: "block",
                marginBottom: "15px",
              }}
              variant="rectangular"
              height={20}
              width={"100%"}
            />
          ))}
        </Box>
      )}

      {type === "featured" && (
        <div>
          {[1, 2, 3, 4].map((a, i) => (
            <div className="mb5" key={a}>
              <Skeleton
                sx={{ borderRadius: "1px", display: "block" }}
                variant="rectangular"
                height={"90px"}
                width={"100%"}
              />
            </div>
          ))}
        </div>
      )}

      {type === "users" && (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={max_grid ? max_grid : 3}
              key={item}
            >
              <Skeleton
                sx={{ borderRadius: "1px", display: "block" }}
                variant="rectangular"
                height={"90px"}
                width={"100%"}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {type === "highlighted" && (
        <div
          className="flex flex-col"
          style={{ minHeight: "400px", zIndex: "9000000" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Skeleton variant="rectangular" width={"100%"} height={400} />
            </Grid>
          </Grid>
        </div>
      )}

      {type === "event-detail" && (
        <div>
          <Skeleton variant="rectangular" width={"100%"} height={150} />
          <Skeleton
            sx={{ bacgroundColor: "#777777" }}
            variant="rectangular"
            width={"100%"}
            height={400}
          />
          <Divider />
          <Skeleton variant="rectangular" width={"100%"} height={70} />
          <Divider />
          <Skeleton variant="rectangular" width={"100%"} height={70} />
          <Divider />
          <Skeleton variant="rectangular" width={"100%"} height={70} />
          <Divider />
          <Skeleton variant="rectangular" width={"100%"} height={70} />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(PlaceHolder);
