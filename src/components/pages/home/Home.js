import React from "react";
import Header from "./Header";
import GameTypeWrapper from "./GameTypeWrapper";
import GameType from "./GameType";

function Home() {
  return (
    <div className="home">
      <Header />
      <GameTypeWrapper>
        <GameType type="one-suite" />
        <GameType type="four-suite" />
        <GameType type="klondike" />
      </GameTypeWrapper>
    </div>
  );
}

export default Home;
