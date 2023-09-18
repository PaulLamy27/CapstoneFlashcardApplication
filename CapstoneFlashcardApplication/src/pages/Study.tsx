
import { useState } from "react";
import Card from '../components/Card'
import { CardInfo } from '../components/CardInfo'
import cardData from '../data/cardData'
import Draw from "../components/DrawCard";

import './Study.css'

const Study = () => {

    // trygint to see if the component even mounts lol
    console.log("BRUH is this even being called?!?!?!?")

    cardData.forEach((card) => {
        console.log(card)
    })

    const getRandomCard = (cardData: CardInfo[]) => {
        let card = cardData[Math.floor(Math.random() * cardData.length)];
        return card;
    }

    // 
    const [currentCard, setCurrentCard] = useState(getRandomCard(cardData));

    const updateCard = () => {
        console.log("New Card!!")
        const newCard = getRandomCard(cardData);
        setCurrentCard(newCard);
        // update the card that is on the screen
    }

    // the state of currentCard is set to false on first render.
    // if this is the case, then the page is just now being rendered.
    if (currentCard === null) {
        // const firstCardOnRender = getRandomCard(cardsData)
        // setCurrentCard(firstCardOnRender)
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="App">
                <div className="cardRow">
                    <Card card={currentCard} />
                </div>
                <div className="buttonRow">
                    <Draw onClick={updateCard} />
                </div>
            </div>
        </>
    )
}

export default Study