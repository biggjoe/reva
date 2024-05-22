import Head from "next/head";
import "../css/bootstrap.min.css";
import "../css/layout.css";
import "../css/buypanel.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/style.css";
import "../css/template.css";
import "../css/dashboard.css";
import toast, { Toaster } from "react-hot-toast";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { bscTestnet } from "viem/chains";
import { UserProvider } from "../services/UserContext";

const projectId = "7fb83121f24001fe287ad6e719130eab";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [bscTestnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: false,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/*  <UserProvider> */}
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="assets/images/favicon.ico" />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <title>Reva Finance</title>
        <meta name="description" content="Reva Finance" />
      </Head>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Component {...pageProps} />
      {/*   </UserProvider> */}
    </WagmiConfig>
  );
}
