import React from "react";
import "./GameTypeWrapper.css";

function GameTypeWrapper(props) {
  return <div className="gametypewrapper">{props.children}</div>;
}

export default GameTypeWrapper;
