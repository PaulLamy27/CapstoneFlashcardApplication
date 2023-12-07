import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from '../components/Card'
import { CardInfo } from '../components/CardInfo'
import DisplayResults from "../components/DisplayResults";

import Correct from "../components/Correct";
import Wrong from "../components/Wrong";
import TryAgain from "../components/TryAgain";

import { useParams } from 'react-router';

import axios from "axios";

import './Study.css'
import YourDecks from "./YourDecks";

const Study = () => {

    const { deckName } = useParams();

    const [cardsList, setCardsList] = useState<CardInfo[]>([]);
    const [deckSize, setDeckSize] = useState(cardsList.length);

    const [currentCard, setCurrentCard] = useState<CardInfo>({
        id: 0,
        side1: "",
        side2: ""
    });
    const [correctList, setCorrectList] = useState(Array<CardInfo>(0).fill(null));
    const [wrongList, setWrongList] = useState(Array<CardInfo>(0).fill(null));
    const [isStudyComplete, setIsStudyComplete] = useState(false);

    useEffect(() => {
        async function populateCardList() {
            try {
                const response = await axios.get(`http://localhost:5000/api/deck/deckTitle/${deckName}`);
                const data = await response.data;
                console.log(data);
                setCardsList(data);
                console.log("cardsList: ", cardsList);
                // setCardListId(cardList.length++);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error("Since there was an error, here is the value of deckName: ", deckName);
                setCardsList([]);
                // setLoading(false);
            }
        }

        populateCardList();
    }, []);

    useEffect(() => {
        console.log("Updated cardsList: ", cardsList);
        let prevDeckSize = cardsList.length;
        setDeckSize((prevDeckSize) => {
            const newDeckSize = cardsList.length;
            console.log("setDeckSize(cardsList.length); has just run: ", newDeckSize);
            return newDeckSize;
        });
        if (deckSize > 0) { setCurrentCard(getRandomCard); }
    }, [cardsList]);

    const getRandomCard = () => {
        let result = Math.floor(Math.random() * cardsList.length);
        console.log("getRandomCard; result: ", result);
        let card = cardsList[result];
        console.log("getRandomCard ran and here is card: ", card);
        console.log("typeof card: ", typeof (card));
        return card;
    }

    const getRandomCardTryAgain = () => {
        let result = Math.floor(Math.random() * wrongList.length);
        console.log("getRandomCardTryAgain; result: ", result);
        let card = wrongList[result];
        console.log("getRandomCard ran and here is card: ", card);
        console.log("typeof card: ", typeof (card));
        return card;
    }

    const updateCard = () => {
        console.log("New Card!!")
        let newCard = getRandomCard();
        console.log("newCard: ", newCard);
        setCurrentCard(newCard);
        // update the card that is on the screen
    }

    const updateCardTryAgain = () => {
        console.log("New Card!!")
        let newCard = getRandomCardTryAgain();
        console.log("newCard: ", newCard);
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

    const handleTryAgain = (wrongList: CardInfo[]) => {

        // setCardsList(wrongList);
        // setCurrentCard(wrongList[0]);
        // console.log(cardsList);
        setDeckSize(wrongList.length);
        if (wrongList.length === 0) {
            setIsStudyComplete(true);
        }
        setCardsList(wrongList);

        console.log("handleTryAgain; cardsList: ", cardsList);
        updateCardTryAgain();
        console.log("wrongList: ", wrongList);
        setWrongList([]);
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

                {!isStudyComplete && deckSize === 0 && (
                    <div>
                        <DisplayResults right={correctList} wrong={wrongList} />
                        <TryAgain onClick={() => handleTryAgain(wrongList)} />
                    </div>
                )}

                {isStudyComplete && (
                    <>
                        <div className="mt-10 flex items-center justify-center">
                            <h1 className="text-5xl text-lime-500 font-bold">
                                WELL DONE! 😄
                            </h1>
                        </div>
                        <Link to={'/your-decks'} className="flex items-center justify-center">
                            <button className="text-2xl rounded font-medium border-none w-48 h-20 block mx-auto my-5 text-center no-underline text-green-600 bg-green-200 hover:bg-green-300 focus:outline-none focus:bg-green-300 shadow-md">
                                Go Back
                            </button>
                        </Link>
                    </>
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