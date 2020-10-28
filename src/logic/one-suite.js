import * as _ from "lodash";

import cardInfo from "../utils/cardInfo";
import { getRank } from "./shared";

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

export const checkMovable = (card, deck) => {
  var movingCards = deck.slice(deck.indexOf(card));
  var ranks = movingCards.map((curCard) => {
    getRank(curCard.rank);
  });
  var curRank = getRank(card.rank);
  for (let i = 1; i < ranks.length; i++) {
    if (curRank - ranks[i] != 1) return false;
    curRank = ranks[i];
  }
  return true;
};

export const checkMove = (target, deck, game) => {
  if (
    target.suit == game.selectedCard.suit &&
    getRank(target.rank) - getRank(game.selectedCard.rank) == 1
  ) {
    if (deck.indexOf(target) == deck.length - 1) {
      return true;
    }
  }
  return false;
};

export const removeSelection = (game, setgame) => {
  if (game.selectedCard !== "") {
    var decks = game.decks;
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks[i].length; j++) {
        decks[i][j].isSelected = false;
      }
    }
    setgame((prevState) => ({
      ...prevState,
      selected: [],
      decks: decks,
      selectedCard: "",
      selectedDeck: "",
      highlightedCard: "",
      highlightedDeck: "",
    }));
  }
};

export const dragStart = (event, card, deck, game, setgame) => {
  const x = event.pageX;
  const y = event.pageY;
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);
  // console.log(x, y);
  setgame((prevState) => ({
    ...prevState,
    x: x,
    y: y,
  }));
  removeSelection(game, setgame);
  selectCard(card, deck, null, game, setgame);
};

export const drag = (event, card, game, setgame) => {
  game.selected.forEach((card) => {
    var child = document.getElementById(
      card.rank + " " + card.suit + " " + card.deck
    ).children[0];
    var movex = event.pageX - game.x;
    var movey = event.pageY - game.y;
    if (event.pageX == 0) {
      var css = "z-index:9999;transform:translate(0px,0px);display:none;";
    } else {
      var css =
        "z-index:9999;pointer-events: none; transform: scale(1.05, 1.05) rotate(0deg) translate(" +
        movex +
        "px, " +
        movey +
        "px);";
    }
    child.style.cssText = css;
  });
};

export const dragEnter = (event, game, setgame, card, deck) => {
  setgame((prevState) => ({
    ...prevState,
    highlightedCard: card,
    highlightedDeck: deck,
  }));
};

export const moveCards = function (toDeck, fromDeck, fromCard, setgame, game) {
  var tempDeck = game.decks;
  var to = tempDeck.indexOf(toDeck);
  var from = tempDeck.indexOf(fromDeck);
  var cardIdx = tempDeck[from].indexOf(fromCard);

  var movedCards = tempDeck[from].splice(cardIdx);
  movedCards.forEach((card) => {
    tempDeck[to].push(card);
  });
  try {
    if (tempDeck[from][tempDeck[from].length - 1].isDown == true) {
      tempDeck[from][tempDeck[from].length - 1].isDown = false;
    }
  } catch (err) {
    console.log(err);
  }
  setgame((prevState) => ({
    ...prevState,
    decks: tempDeck,
  }));
};

export const selectCard = (card, deck, holder, game, setgame) => {
  if (holder && game.selectedCard) {
    if (game.selectedCard.rank == "K") {
      if (checkMovable(game.selectedCard && game.selectedDeck)) {
        moveCards(deck, game.selectedDeck, game.selectedCard);
        // isCompleteHand(deck);
        removeSelection(game, setgame);
      } else {
        removeSelection(game, setgame);
      }
    }
  }
  if (game.selectedCard == "") {
    if (card.isDown) {
      return;
    }
    var tempCard = card;
    tempCard.isSelected = true;
    setgame((prevState) => ({
      ...prevState,
      selectedCard: tempCard,
      selectedDeck: deck,
    }));
    if (checkMovable(tempCard, deck)) {
      var selected = deck.slice(deck.indexOf(card));
      selected.forEach((curCard) => {
        curCard.isSelected = true;
      });
      setgame((prevState) => ({
        ...prevState,
        selected: selected,
      }));
    } else {
      if (checkMove(tempCard, deck, game)) {
        if (checkMovable(game.card, game.deck)) {
          moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
          // isCompleteHand(deck);
          removeSelection(game, setgame);
        } else {
          removeSelection(game, setgame);
        }
      } else {
        removeSelection(game, setgame);
      }
    }
  }
};

export const drop = (event, card, game, setgame) => {
  if (game.highlightedCard == "") {
    if (card.rank == "K") {
      if (checkMovable(game.selectedCard, game.selectedDeck)) {
        moveCards(
          game.highlightedDeck,
          game.selectedDeck,
          game.selectedCard,
          game,
          setgame
        );
        // isCompleteHand(game.highlightedDeck);
        removeSelection();
      } else {
        removeSelection(game, setgame);
      }
    }
  }

  if (checkMove(game.highlightedCard, game.highlightedCard, game)) {
    if (checkMovable(game.selectCard, game.selectedDeck)) {
    }
  }
};
