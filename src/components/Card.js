import React, { useState, useEffect } from "react";
import cardInfo from "../utils/cardInfo";

import "./Card.css";

function Card({ card, isSelected, isDown, isHighlighted }) {
  const [down, setdown] = useState("");
  const [select, setselect] = useState("");
  const [highlight, sethighlight] = useState("");
  useEffect(() => {
    if (isDown) {
      setdown(" card__down");
    } else {
      setdown(" " + card.suit);
    }
    if (isSelected) {
      setselect(" card__selected");
    } else {
      setselect("");
    }
    if (isHighlighted) {
      sethighlight(" card__highlighted");
    } else {
      sethighlight("");
    }
  }, [isDown, isSelected, isHighlighted]);
  return (
    <div className={"card" + down + select + highlight}>
      <div className="card__content card__rank-left">{card.rank}</div>
      <div className="card__content card__suite-left">
        {cardInfo["symbol"][card.suit]}
      </div>
      <div className="card__content card__suite-right">
        {cardInfo["symbol"][card.suit]}
      </div>
      <div className="card__content card__rank-right">{card.rank}</div>
    </div>
  );
}

export default Card;
