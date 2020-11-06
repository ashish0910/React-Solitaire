import React, { useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./Klondike.css";
import CardHolder from "../../CardHolder";
import Card from "../../Card";
import {
  populateKlondikeCards,
  selectCard,
  dragStart,
  drag,
  drop,
  addDealCard,
  dragEnter,
} from "../../../logic/klondike";
import Back from "../../Back";

function Klondike() {
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
    foundation: ["", "", "", ""],
    dealingCards: [],
  });
  useEffect(() => {
    const val = populateKlondikeCards();
    setcards(val);
    setgame((prevState) => ({
      ...prevState,
      cards: val.cards,
      decks: val.decks,
    }));
  }, []);
  return (
    <div className="klondike">
      <Back></Back>
      <div className="klondike__upper">
        {cards.hasOwnProperty("decks") && game.decks[7].length > 0 ? (
          <div
            onClick={(e) => {
              addDealCard(game, setgame);
            }}
            className="cardholder__bg"
          ></div>
        ) : (
          <div
            onClick={(e) => {
              addDealCard(game, setgame);
            }}
            className="cardholder"
          ></div>
        )}
        {cards.hasOwnProperty("decks") && game.dealingCards.length > 0 ? (
          <div
            id={
              game.dealingCards[game.dealingCards.length - 1].rank +
              " " +
              game.dealingCards[game.dealingCards.length - 1].suit +
              " " +
              game.dealingCards[game.dealingCards.length - 1].deck
            }
            draggable={true}
            onDragStart={(e) => {
              dragStart(
                e,
                game.dealingCards[game.dealingCards.length - 1],
                game.dealingCards,
                game,
                setgame
              );
            }}
            onClick={(e) => {
              selectCard(
                game.dealingCards[game.dealingCards.length - 1],
                game.dealingCards,
                game,
                setgame,
                "dealing"
              );
            }}
            onDrag={(e) => {
              drag(
                e,
                game.dealingCards[game.dealingCards.length - 1],
                game,
                setgame,
                true
              );
            }}
            onDragEnd={(e) => {
              drop(
                e,
                game.dealingCards[game.dealingCards.length - 1],
                game,
                setgame,
                true
              );
            }}
          >
            <Card
              card={game.dealingCards[game.dealingCards.length - 1]}
              isSelected={
                game.dealingCards[game.dealingCards.length - 1].isSelected
              }
              isDown={game.dealingCards[game.dealingCards.length - 1].isDown}
            ></Card>
          </div>
        ) : (
          <div className="cardholder"></div>
        )}
        <div className="klondike__upper__row">
          {cards.hasOwnProperty("decks") &&
            game.foundation.map((card, index) => (
              <div className="spacer">
                {card == "" ? (
                  <div
                    className="cardholder"
                    onClick={(e) => {
                      selectCard(card, index, game, setgame, "foundation");
                    }}
                    onDragEnter={(e) => {
                      dragEnter(e, game, setgame, card, index);
                    }}
                  ></div>
                ) : (
                  <div
                    onClick={(e) => {
                      selectCard(card, index, game, setgame, "foundation");
                    }}
                    onDragEnter={(e) => {
                      dragEnter(e, game, setgame, card, index);
                    }}
                  >
                    <Card
                      key={card.rank + " " + card.suit + " " + card.deck}
                      card={card}
                      isSelected={false}
                      isDown={card.isDown}
                    ></Card>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="klondike__bottom">
        {cards.hasOwnProperty("decks") &&
          game.decks.slice(0, 7).map((deck, index) => (
            <React.Fragment>
              {deck.length === 0 ? (
                <div
                  id="holder"
                  key={index + "0"}
                  onClick={() => {
                    selectCard("", deck, game, setgame, "holder");
                  }}
                  onDragEnter={(e) => {
                    dragEnter(e, game, setgame, "", deck);
                  }}
                >
                  <CardHolder key={index + " 1"} deck={deck} />
                </div>
              ) : (
                <div key={index + " 2"} deck={deck}>
                  <ReactCSSTransitionGroup
                    transitionName="card"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    key={index + " 3"}
                    deck={deck}
                  >
                    {deck.map((card, key) => (
                      <div
                        key={
                          card.rank + " " + card.suit + " " + card.deck + " 0"
                        }
                        id={card.rank + " " + card.suit + " " + card.deck}
                        className="card__wrapper card__stack"
                        draggable={true}
                        onDragStart={(e) => {
                          dragStart(e, card, deck, game, setgame);
                        }}
                        onDrag={(e) => {
                          drag(e, card, game, setgame);
                        }}
                        onDragEnter={(e) => {
                          if (card.isDown == false) {
                            dragEnter(e, game, setgame, card, deck);
                          }
                        }}
                        onDragEnd={(e) => {
                          drop(e, card, game, setgame);
                        }}
                        onClick={(e) => {
                          selectCard(card, deck, game, setgame);
                        }}
                      >
                        <Card
                          key={card.rank + " " + card.suit + " " + card.deck}
                          card={card}
                          isSelected={card.isSelected}
                          isDown={card.isDown}
                        ></Card>
                      </div>
                    ))}
                  </ReactCSSTransitionGroup>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Klondike;
