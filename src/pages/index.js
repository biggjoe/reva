import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CounterArea from "../components/Home/CounterArea";
import TheCompany from "../components/Home/TheCompany";
import Brands from "../components/Home/Brands";
import JoinCommunity from "../components/Home/JoinCommunity";
import Features from "../components/Home/Features";
import Tokenomics from "../components/Home/Tokenomics";
import Roadmap from "../components/Home/Roadmap";
import Faq from "../components/Home/Faq";
import LeaveMessage from "../components/Home/LeaveMessage";
import HomeMain from "../components/Home/HomeMain";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header /> {/**/}
      <div className="main-bg-grad home-cover">
        <div className="home-overlay"></div>
        <HomeMain /> {/* */}
      </div>
      {/**/}
      <CounterArea />
      <TheCompany />
      <Brands />
      <JoinCommunity />
      <Features />
      <Tokenomics />
      <Roadmap />
      <Faq />
      <LeaveMessage />
      <Footer />
    </>
  );
}
