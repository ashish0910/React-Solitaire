import React, { useState, useEffect } from "react";
import cardInfo from "../utils/cardInfo";

import "./Card.css";

function Card({ card, isSelected }) {
  const [down, setdown] = useState("");
  useEffect(() => {
    if (card.isDown) {
      setdown("card__down");
    }
  }, []);
  return (
    <div className={"card " + down}>
      <div className="card__content card__rank-left">{card.rank}</div>
      <div className="card__content card__suite-left">
        {cardInfo["symbol"][card.suit]}
      </div>
      <div className="card__content card__suite">{card.suit}</div>
      <div className="card__content card__suite-right">
        {cardInfo["symbol"][card.suit]}
      </div>
      <div className="card__content card__rank-right">{card.rank}</div>
    </div>
  );
}

export default Card;
