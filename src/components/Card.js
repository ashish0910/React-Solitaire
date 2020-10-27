import React from "react";
import cardInfo from "../utils/cardInfo";

import "./Card.css";

function Card({ rank, suit, isdown }) {
  return (
    <div className="card">
      <div className="card__rank-left">{cardInfo["ranks"][rank]}</div>
      <div className="card__suite-left">{cardInfo["suits"][suit]}</div>
      <div className="card__suite">{cardInfo["suits"][suit]}</div>
      <div className="card__suite-right">{cardInfo["suits"][suit]}</div>
      <div className="card__rank-right">{cardInfo["ranks"][rank]}</div>
    </div>
  );
}

export default Card;
