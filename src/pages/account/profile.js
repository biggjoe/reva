import React from "react";
import Layout from "../../components/Account/Layout";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ProfileTemplate from "../../components/ProfileTemplate";
import ChangePasswordTemplate from "../../components/ChangePasswordTemplate";
import useAuthService from "../../services/useAuthService";
import ChangeAddressTemplate from "../../components/ChangeAddressTemplate";
import Link from "next/link";

const Profile = () => {
  const [path, setPath] = React.useState("profile");
  const [profile_set, setProfileSet] = React.useState(false);
  const user = useAuthService().getCurrentUser();
  React.useEffect(() => {
    if (user) {
      setProfileSet(true);
    }
  }, []);
  const navas = [
    { path: "profile", title: "Profile" },
    { path: "change_password", title: "Change Password" },
    { path: "address", title: "Wallet Address" },
  ];
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
              <div className="page-head bga">
                <div className="flex flex-row-resp px20">
                  <div className="inline-block py20">
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Link href="/account/dashboard">Dashboard</Link>
                      <span>Profile</span>
                    </Breadcrumbs>
                    <h2 className="mt20">Profile</h2>
                  </div>
                </div>
              </div>

              <ul className="flat-nav border-bottom">
                {navas.map((item, index) => (
                  <li key={item.path}>
                    <button
                      className={
                        path === item.path
                          ? "button-link active"
                          : "button-link"
                      }
                      onClick={() => setPath(item.path)}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
              <section className="pxy20">
                {profile_set && path === "profile" && (
                  <ProfileTemplate user={user} fetched={profile_set} />
                )}
                {profile_set && path === "change_password" && (
                  <ChangePasswordTemplate user={user} fetched={profile_set} />
                )}
                {profile_set && path === "address" && (
                  <ChangeAddressTemplate user={user} fetched={profile_set} />
                )}
              </section>
            </Card>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Profile;
