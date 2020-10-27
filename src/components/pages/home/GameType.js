import React from "react";
import { Link } from "react-router-dom";
import "./GameType.css";

function GameType(props) {
  return (
    <div className="gametype">
      <Link to={props.type}>
        <p className="gametype__link"> {props.type} </p>
      </Link>
    </div>
  );
}

export default GameType;
