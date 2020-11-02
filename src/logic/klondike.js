import * as _ from "lodash";
import cardInfo from "../utils/cardInfo";
import { getRank, removeSelection, drag, dragEnter } from "./shared";

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

export const dragStart = (event, card, deck, game, setgame) => {
  const x = event.pageX;
  const y = event.pageY;
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);
  setgame((prevState) => ({
    ...prevState,
    x: x,
    y: y,
  }));
  removeSelection(game, setgame);
  // selectCard()
};

export const checkMovable = (card, deck) => {
  var tempDeck = [...deck];
  var movingCards = tempDeck.slice(deck.indexOf(card));
  var ranks = movingCards.map((curCard) => {
    return getRank(curCard.rank);
  });
  var colors = movingCards.map((curCard) => {
    return getRank(curCard.color);
  });
  var curRank = getRank(card.rank);
  var curColor = card.color;
  for (let i = 1; i < ranks.length; i++) {
    if (curRank - ranks[i] !== 1) return false;
    if (curColor === colors[i]) return false;
    curRank = ranks[i];
    curColor = colors[i];
  }
  return true;
};

export const checkMove = (target, from) => {
  if (getRank(target.rank) - getRank(from.rank) === 1) {
    if (target.color !== from.color) {
      return true;
    }
  }
  return false;
};

export const checkFoundation = (foundation, card) => {
  if (foundation === "" && card.rank === "A") {
    return true;
  }
  if (
    foundation.suit === card.suit &&
    getRank(card.rank) - getRank(foundation.rank) === 1
  )
    return true;
  return false;
};

export const selectCard = (card, deck, holder, game, setgame, type) => {
  if (type === "dealing" && game.selectedCard !== "") {
    removeSelection(game, setgame);
    return;
  }
  if (type === "foundation") {
    if (game.selectedCard !== "") {
    } else {
      return;
    }
  }
  if (type === "holder" && game.selectedCard !== "") {
    if (game.selectedCard.rank === "K") {
      // movecards
    } else {
      removeSelection(game, setgame);
    }
  }
  var tempCard = card;
  // Handling select card by on click and drag and drop
  if (game.selectedCard === "") {
    if (holder) return;
    if (card.isDown) {
      return;
    }
    if (checkMovable(card, deck)) {
      tempCard.isSelected = true;
      var tempDeck = [...deck];
      var selected = tempDeck.slice(deck.indexOf(card));
      selected.forEach((curCard) => {
        curCard.isSelected = true;
      });
      setgame((prevState) => ({
        ...prevState,
        selected: selected,
        selectedCard: card,
        selectedDeck: deck,
      }));
    }
  } else {
    // Handling moving of cards by click functionality
    if (checkMove(tempCard, deck, game)) {
      // moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      removeSelection(game, setgame);
    } else {
      removeSelection(game, setgame);
    }
  }
};
