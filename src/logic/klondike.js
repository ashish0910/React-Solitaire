import * as _ from "lodash";
import cardInfo from "../utils/cardInfo";

export const populateKlondikeCards = () => {
  let cards = [],
    decks = [];
  cardInfo["rank"].forEach((rank) => {
    cardInfo["suit"].forEach((suit) => {
      if (suit === "spade" || suit === "club") {
        cards.push({
          rank: rank,
          suit: suit,
          isDown: true,
          isSelected: false,
          isHighlighted: false,
          color: "black",
        });
      } else {
        cards.push({
          rank: rank,
          suit: suit,
          isDown: true,
          isSelected: false,
          isHighlighted: false,
          color: "red",
        });
      }
    });
  });
  let shuffledCards = _.shuffle(cards);
  for (let i = 0; i < 7; i++) {
    decks.push(
      shuffledCards.slice((i * (i + 1)) / 2, (i * (i + 1)) / 2 + i + 1)
    );
  }
  decks[7] = shuffledCards.slice(28);
  for (let i = 0; i < 7; i++) {
    decks[i][i].isDown = false;
  }
  return {
    decks: decks,
    cards: shuffledCards,
  };
};
