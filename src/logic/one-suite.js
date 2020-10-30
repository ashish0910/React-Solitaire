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

export const checkMovable = (card, deck) => {
  var tempDeck = [...deck];
  var movingCards = tempDeck.slice(deck.indexOf(card));
  var ranks = movingCards.map((curCard) => {
    return getRank(curCard.rank);
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
  if (game.selectedCard !== "" || game.highlightedCard !== "") {
    var decks = [...game.decks];
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks[i].length; j++) {
        decks[i][j].isSelected = false;
        decks[i][j].isHighlighted = false;
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
  var tempDecks = [...game.decks];
  if (card !== "" && card != game.selectedCard) {
    var deckIdx = tempDecks.indexOf(deck);
    var cardIdx = tempDecks[deckIdx].indexOf(card);
    tempDecks.forEach((deck) =>
      deck.forEach((tempCard) => (tempCard.isHighlighted = false))
    );
    tempDecks[deckIdx][cardIdx].isHighlighted = true;
  }
  setgame((prevState) => ({
    ...prevState,
    highlightedCard: card,
    highlightedDeck: deck,
    decks: tempDecks,
  }));
};

export const moveCards = function (toDeck, fromDeck, fromCard, setgame, game) {
  var tempDeck = [...game.decks];
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
        isHandComplete(deck, game, setgame);
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
    } else {
      if (checkMove(tempCard, deck, game)) {
        if (checkMovable(game.card, game.deck)) {
          moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
          isHandComplete(deck, game, setgame);
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
        isHandComplete(game.highlightedDeck, game, setgame);
        removeSelection(game, setgame);
      } else {
        removeSelection(game, setgame);
      }
    }
  }
  if (checkMove(game.highlightedCard, game.highlightedDeck, game)) {
    if (checkMovable(game.selectedCard, game.selectedDeck)) {
      game.selected.forEach((card) => {
        var child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        var css = "z-index:0;pointer-events:auto;display:none;";
        child.style.cssText = css;
      });
      moveCards(
        game.highlightedDeck,
        game.selectedDeck,
        game.selectedCard,
        setgame,
        game
      );
      isHandComplete(game.highlightedDeck, game, setgame);
      removeSelection(game, setgame);
      return;
    } else {
      game.selected.forEach((card) => {
        var child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        var css = "z-index:0;pointer-events:auto;";
        child.style.cssText = css;
      });
      removeSelection(game, setgame);
    }
  } else {
    game.selected.forEach((card) => {
      var child = document.getElementById(
        card.rank + " " + card.suit + " " + card.deck
      ).children[0];
      var css = "z-index:0;pointer-events:auto;";
      child.style.cssText = css;
    });
    removeSelection(game, setgame);
  }
};

export const checkDeck = (deck) => {
  var ranks = deck.map((card) => {
    return getRank(card.rank);
  });
  const expectedArray = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  if (_.isEqual(expectedArray, ranks.slice(-13))) {
    return ranks.length - 13;
  }
  return false;
};

export const isHandComplete = (deck, game, setgame) => {
  var len = checkDeck(deck);
  if (len !== false) {
    var tempDecks = [...game.decks];
    var curDeckIdx = tempDecks.indexOf(deck);
    console.log(curDeckIdx);
    tempDecks[curDeckIdx].splice(len);
    var curHands = game.hands;
    if (tempDecks[curDeckIdx].length != 0) {
      tempDecks[curDeckIdx][tempDecks[curDeckIdx].length - 1].isDown = false;
    }
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
      hands: curHands + 1,
    }));
    if (curHands + 1 === 8) console.log("khatam , bye bye tata");
  }
};

export const distributeRemCards = (game, setgame) => {
  if (game.decks[10].length !== 0) {
    var tempDecks = [...game.decks];
    tempDecks.forEach((tempDeck) => {
      if (tempDecks[10].length > 0) {
        var tempCard = tempDecks[10].pop();
        tempCard.isDown = false;
        tempDeck.push(tempCard);
      }
    });
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
    }));
    tempDecks.forEach((tempDeck) => {
      isHandComplete(tempDeck, game, setgame);
    });
  }
};
