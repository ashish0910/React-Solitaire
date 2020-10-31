import * as _ from "lodash";
import cardInfo from "../utils/cardInfo";

// Function to generate card decks
export const populateOneSuitCards = () => {
  let cards = [],
    decks;
  cardInfo["rank"].forEach((rank) => {
    for (let i = 1; i <= 8; i++) {
      cards.push({
        rank: rank,
        suit: "spade",
        isDown: true,
        deck: i,
        isSelected: false,
        isHighlighted: false,
      });
    }
  });
  let shuffledCards = _.shuffle(cards);
  decks = _.chunk(shuffledCards.slice(0, 50), 5);
  decks[10] = shuffledCards.slice(50);
  for (let i = 0; i <= 9; i++) {
    decks[i][decks[i].length - 1].isDown = false;
  }
  return {
    decks: decks,
    cards: shuffledCards,
  };
};
