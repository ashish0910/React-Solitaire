import React, { useEffect, useState } from "react";
import "./Klondike.css";
import CardHolder from "../../CardHolder";
import Card from "../../Card";
import { populateKlondikeCards } from "../../../logic/klondike";

function Klondike() {
  const [cards, setcards] = useState({});
  useEffect(() => {
    const val = populateKlondikeCards();
    setcards(val);
  }, []);
  return (
    <div className="klondike">
      <div className="klondike__upper"></div>
      <div className="klondike__bottom">
        {cards.hasOwnProperty("decks") &&
          cards.decks.slice(0, 7).map((deck, index) => (
            <React.Fragment>
              {deck.length === 0 ? (
                <div id="holder" key={index + "0"}>
                  <CardHolder key={index + " 1"} deck={deck} />
                </div>
              ) : (
                <div key={index + " 2"} deck={deck}>
                  <div key={index + " 3"} deck={deck}>
                    {deck.map((card, key) => (
                      <div
                        key={
                          card.rank + " " + card.suit + " " + card.deck + " 0"
                        }
                        id={card.rank + " " + card.suit + " " + card.deck}
                        className="card__wrapper card__stack"
                        draggable={true}
                      >
                        <Card
                          key={card.rank + " " + card.suit + " " + card.deck}
                          card={card}
                          isSelected={card.isSelected}
                          isDown={card.isDown}
                          isHighlighted={card.isHighlighted}
                        ></Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Klondike;
