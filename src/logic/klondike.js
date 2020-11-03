import * as _ from "lodash";
import cardInfo from "../utils/cardInfo";
import { getRank, removeSelection, dragEnter, moveCards } from "./shared";

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
  if (game.selectedCard === card) {
    return;
  }
  removeSelection(game, setgame);
  selectCard(card, deck, game, setgame, "dealing");
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

// Function to add css animation to show movement of selected card and decks
export const drag = (event, card, game, setgame, dealer) => {
  game.selected.forEach((card) => {
    if (dealer) {
    } else {
      var child = document.getElementById(
        card.rank + " " + card.suit + " " + card.deck
      ).children[0];
    }

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

export const drop = (event, card, game, setgame, dealer) => {
  if (typeof game.highlightedDeck == "number") {
  }
  if (game.highlightedCard === "") {
    if (card.rank === "K") {
      if (checkMovable(game.selectedCard, game.selectedDeck)) {
        moveCards(
          game.highlightedDeck,
          game.selectedDeck,
          game.selectedCard,
          setgame,
          game
        );
        removeSelection(game, setgame);
      }
    }
  }
  if (checkMove(game.highlightedCard, game.selectedCard)) {
    if (checkMovable(game.selectedCard, game.selectedDeck)) {
      game.selected.forEach((card) => {
        if (dealer) {
        } else {
          var child = document.getElementById(
            card.rank + " " + card.suit + " " + card.deck
          ).children[0];
          var css = "z-index:0;pointer-events:auto;display:none;";
          child.style.cssText = css;
        }
      });
      moveCards(
        game.highlightedDeck,
        game.selectedDeck,
        game.selectedCard,
        setgame,
        game
      );
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
      if (dealer) {
      } else {
        var child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        var css = "z-index:0;pointer-events:auto;";
        child.style.cssText = css;
      }
    });
    removeSelection(game, setgame);
  }
};

export const selectCard = (card, deck, game, setgame, type) => {
  if (type === "dealing" && game.selectedCard !== "") {
    removeSelection(game, setgame);
    return;
  }
  if (type === "foundation") {
    if (game.selectedCard !== "") {
      if (
        game.selectedDeck[game.selectedDeck.length - 1] == game.selectedCard
      ) {
        if (checkFoundation(card, game.selectedCard)) {
          var tempFoundation = [...game.foundation];
          tempFoundation[deck] = game.selectedCard;
          var tempDecks = [...game.decks];
          var deckIdx = tempDecks.indexOf(game.selectedDeck);
          tempDecks[deckIdx].pop();
          try {
            if (
              tempDecks[deckIdx][tempDecks[deckIdx].length - 1].isDown === true
            ) {
              tempDecks[deckIdx][tempDecks[deckIdx].length - 1].isDown = false;
            }
          } catch (error) {
            console.log(error);
          }
          setgame((prevState) => ({
            ...prevState,
            decks: tempDecks,
            selectedCard: "",
            selectedDeck: "",
            foundation: tempFoundation,
          }));
        }
      }
      removeSelection(game, setgame);
    } else {
      return;
    }
  }
  if (type === "holder" && game.selectedCard !== "") {
    if (game.selectedCard.rank === "K") {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      removeSelection(game, setgame);
    } else {
      removeSelection(game, setgame);
    }
  }
  var tempCard = card;
  // Handling select card by on click and drag and drop
  if (game.selectedCard === "") {
    if (type === "holder") return;
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
    if (checkMove(tempCard, game.selectedCard)) {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      removeSelection(game, setgame);
    } else {
      removeSelection(game, setgame);
    }
  }
};

export const fillDealCard = (game, setgame) => {
  var tempDealingCards = game.dealingCards;
  tempDealingCards = tempDealingCards.reverse();
  var tempDecks = [...game.decks];
  tempDecks[7] = tempDealingCards;
  setgame((prevState) => ({
    ...prevState,
    decks: tempDecks,
    dealingCards: [],
  }));
};

export const addDealCard = (game, setgame) => {
  if (game.decks[7].length === 0) {
    fillDealCard(game, setgame);
    return;
  }
  var tempDecks = game.decks;
  var tempCard = tempDecks[7].pop();
  tempCard.isDown = false;
  var tempDealingCards = [...game.dealingCards];
  tempDealingCards.push(tempCard);
  setgame((prevState) => ({
    ...prevState,
    decks: tempDecks,
    dealingCards: tempDealingCards,
  }));
};
