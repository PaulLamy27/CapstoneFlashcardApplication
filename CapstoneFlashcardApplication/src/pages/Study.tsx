
import { useState } from "react";
import Card from '../components/Card'
import { CardInfo } from '../components/CardInfo'
import cardData from '../data/cardData'
import Draw from "../components/DrawCard";

import Correct from "../components/Correct";
import Wrong from "../components/Wrong";
import Result from "../components/Result";

import './Study.css'

const Study = () => {

    // trygint to see if the component even mounts lol
    // console.log("BRUH is this even being called?!?!?!?")

    // cardData.forEach((card) => {
    //     console.log(card)
    // })

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

    const [correctLists, setCorrectLists] = useState(Array(0).fill(null));

    const correctCards = (currentCard: CardInfo) => {

        const nextlist = correctLists.slice();
        nextlist.push(currentCard.side1);
        console.log({ nextlist });
        setCorrectLists(nextlist);
        // Collect correct data

    }

    const [wrongLists, setWrongLists] = useState(Array(0).fill(null));

    const wrongCards = (currentCard: CardInfo) => {


        const nextlist = correctLists.slice();
        nextlist.push(currentCard.side1);
        console.log({ nextlist });
        setWrongLists(nextlist);
        // Collect wrong data

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
                    < Correct onClick={() => correctCards(currentCard)} />
                    < Wrong onClick={() => wrongCards(currentCard)} />
                </div>
                {/* return (
                <ul>
                    {collectLists.map(item => {
                        return <h3>{item}</h3>;
                    })}
                </ul>
                ); */}
                {/* <div>
                 < Result value = { collectLists } />
                 </div> */}
            </div>

        </>


    )
}

export default Study
