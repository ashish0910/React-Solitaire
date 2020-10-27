import React from "react";
import cardInfo from "../utils/cardInfo";

import "./Card.css";

function Card({ rank, suit, isDown, isSelected }) {
  return (
    <div draggable="true" className="card">
      <div className="card__rank-left">{rank}</div>
      <div className="card__suite-left">{cardInfo["symbol"][suit]}</div>
      <div className="card__suite">{suit}</div>
      <div className="card__suite-right">{cardInfo["symbol"][suit]}</div>
      <div className="card__rank-right">{rank}</div>
    </div>
  );
}

export default Card;
