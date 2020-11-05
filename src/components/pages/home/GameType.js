import React from "react";
import { Link } from "react-router-dom";
import "./GameType.css";

function GameType(props) {
  return (
    <div className="gametype">
      <Link to={props.type}>
        <div>
          <div className={`gametype__${props.type}`}></div>
          <div className="gametype__link"> {props.type} </div>
        </div>
      </Link>
    </div>
  );
}

export default GameType;
