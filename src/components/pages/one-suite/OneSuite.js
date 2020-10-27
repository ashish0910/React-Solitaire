import React, { useEffect } from "react";
import { populateOneSuitCards } from "../../../logic/one-suite";

function OneSuite() {
  let cards = {};
  useEffect(() => {
    cards = populateOneSuitCards();
    console.log(cards);
  }, []);
  return <div>OneSuite</div>;
}

export default OneSuite;
