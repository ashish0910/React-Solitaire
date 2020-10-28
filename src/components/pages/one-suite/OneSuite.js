import React, { useEffect, useState } from "react";
import {
  populateOneSuitCards,
  dragStart,
  drag,
  dragEnter,
  selectCard,
  removeSelection,
  drop,
} from "../../../logic/one-suite";
import CardHolder from "../../CardHolder";
import Card from "../../Card";

import "./OneSuite.css";

function OneSuite() {
  const [cards, setcards] = useState({});
  const [game, setgame] = useState({
    cards: [],
    decks: [],
    selectedCard: "",
    selectedDeck: "",
    selected: [],
    hands: 0,
    x: -1,
    y: -1,
    highlightedDeck: "",
    highlightedCard: "",
    dealtCards: [],
  });
  useEffect(() => {
    const val = populateOneSuitCards();
    setcards(val);
    setgame((prevState) => ({
      ...prevState,
      cards: val.cards,
      decks: val.decks,
    }));
  }, []);

  return (
    <div className="onesuite">
      {cards.hasOwnProperty("decks") &&
        cards.decks.slice(0, 10).map((deck, index) => (
          <React.Fragment>
            {deck.length == 0 && <CardHolder key={index + " 1"} deck={deck} />}
            <div className="card__holder" key={index + " 2"} deck={deck}>
              <div>
                {deck.map((card, key) => (
                  <div
                    id={card.rank + " " + card.suit + " " + card.deck}
                    onDragStart={(e) => {
                      dragStart(e, card, deck, game, setgame);
                    }}
                    draggable={true}
                    onDrag={(e) => drag(e, card, game, setgame)}
                    className="card__wrapper card__stack"
                    onDragEnter={(e) => {
                      if (card.isDown == false) {
                        dragEnter(e, game, setgame, card, deck);
                      }
                    }}
                    onDrop={(e) => drop(e, card)}
                  >
                    <Card
                      key={card.rank + " " + card.suit + " " + card.deck}
                      card={card}
                      isSelected={card.isSelected}
                    />
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      {cards.hasOwnProperty("decks") && (
        <div className="card card__down card__remcards"></div>
      )}
    </div>
  );
}

export default OneSuite;
