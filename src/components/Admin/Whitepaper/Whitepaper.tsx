import React from "react";
import { Routes, Route } from "react-router-dom";
import EditWhitepaper from "./EditWhitepaper";
import ListWhitepaper from "./ListWhitepaper";
import AddWhitepaper from "./AddWhitepaper";

const Whitepaper = (props: any) => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<ListWhitepaper />} />
        <Route path="/" element={<ListWhitepaper />} />
        <Route path="/new" element={<AddWhitepaper />} />
        <Route path="/e/:wId" element={<EditWhitepaper />} />
      </Routes>
    </React.Fragment>
  );
};

export default Whitepaper;
