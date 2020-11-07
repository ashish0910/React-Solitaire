import React from "react";
import { Link } from "react-router-dom";
import "./GameType.css";

function GameType({ type, heading }) {
  return (
    <Link className="gametype__removedecoration" to={type}>
      <div className="gametype">
        <img
          className="gametype__image"
          src={`https://raw.githubusercontent.com/ashish0910/React-Solitaire/main/src/assets/${type}.png`}
        />
        <div className="gametype__link">
          <h3> {heading} Solitaire </h3>
        </div>
      </div>
    </Link>
  );
}

export default GameType;
