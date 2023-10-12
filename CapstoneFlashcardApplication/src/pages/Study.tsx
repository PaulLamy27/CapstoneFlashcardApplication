
import { useState } from "react";
import Card from '../components/Card'
import { CardInfo } from '../components/CardInfo'
import cardData from '../data/cardData'
import Draw from "../components/DrawCard";
import DisplayResults from "../components/DisplayResults";

import Correct from "../components/Correct";
import Wrong from "../components/Wrong";
import Result from "../components/Result";

import './Study.css'

const Study = () => {

    // why is it taking out of the array?
    const getRandomCard = (cardData: CardInfo[]) => {
        let card = cardData[Math.floor(Math.random() * cardData.length)];
        return card;
    }

    const [cardsList, setCardsList] = useState(cardData);
    const [currentCard, setCurrentCard] = useState(getRandomCard(cardData));
    const [correctList, setCorrectList] = useState(Array(0).fill(null));
    const [wrongList, setWrongList] = useState(Array(0).fill(null));
    const [deckSize, setDeckSize] = useState(cardData.length)

    // console.log("cardsList upon page render: ", cardsList);

    const updateCard = () => {
        console.log("New Card!!")
        const newCard = getRandomCard(cardData);
        setCurrentCard(newCard);
        // update the card that is on the screen
    }


    const handleCorrectCards = (currentCard: CardInfo) => {
        // console.log("correctLists Before slice: ", correctLists);
        // const nextlist = correctLists.slice();
        // console.log("correctLists After slice: ", correctLists);

        // console.log("Inside of handleCorrectCards");
        // console.log("deckSize before decerement: ", deckSize);

        // console.log("cardsList before splice: ", cardsList);

        // should this be a function?
        setDeckSize(deckSize - 1);
        // console.log("deckSize after decerement: ", deckSize);

        // function that removes the passed in card from the cardList, thus changing the state
        let currentCardIndex = cardsList.indexOf(currentCard);
        // console.log(currentCardIndex);

        // console.log("correctList BEFORE: ", correctList);
        setCorrectList([...correctList, currentCard]);
        // console.log("correctList AFTER: ", correctList);

        // setCardsList(cardsList.splice(currentCardIndex, 1));
        setCardsList((cardsList) =>
            cardsList.filter((card) => card !== currentCard)
        )

        // console.log("cardsList after splice: ", cardsList);

        updateCard();
        // Collect correct data
        console.log("correctList: ", correctList);

    }

    const handleWrongCards = (currentCard: CardInfo) => {
        // const nextlist = correctList.slice();
        // nextlist.push(currentCard.side1);
        // console.log({ nextlist });
        // setWrongList(nextlist);
        // Collect wrong data

        setDeckSize(deckSize - 1);
        let currentCardIndex = cardsList.indexOf(currentCard);
        setWrongList([...wrongList, currentCard]);
        setCardsList((cardsList) =>
            cardsList.filter((card) => card !== currentCard)
        )
        updateCard();
        console.log("wrongList: ", wrongList);

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

                {/* <div>
                    <DisplayResults rightArray={}/>
                </div> */}

                {deckSize === 0 && (
                    <DisplayResults right={correctList} wrong={wrongList} />
                )}

                {deckSize > 0 && (
                    <>
                        <div className="cardRow">
                            <Card card={currentCard} />
                        </div>
                        <div className="buttonRow">
                            < Correct onClick={() => handleCorrectCards(currentCard)} />
                            < Wrong onClick={() => handleWrongCards(currentCard)} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Study
