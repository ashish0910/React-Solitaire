import React from "react";
import Header from "./Header";
import GameTypeWrapper from "./GameTypeWrapper";
import GameType from "./GameType";
import ScreenSizeWarn from "../../ScreenSizeWarn";

function Home() {
  return (
    <>
      <ScreenSizeWarn />
      <div className="home">
        <Header />
        <GameTypeWrapper>
          <GameType type="one-suite" heading="One Suit" />
          <GameType type="four-suite" heading="Four Suit" />
          <GameType type="klondike" heading="Klondike" />
        </GameTypeWrapper>
      </div>
    </>
  );
}

export default Home;
