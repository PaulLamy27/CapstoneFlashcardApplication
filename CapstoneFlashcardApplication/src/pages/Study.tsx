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
import axiosInstance from "../axiosInstance";
//import YourDecks from "./YourDecks";

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
                const userId = sessionStorage.getItem('id');
                console.log("userId", userId);
                const response = await axiosInstance.get(`/api/deck/studyDeck/${deckName}/${userId}`);
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
        //let prevDeckSize = cardsList.length;
        setDeckSize(() => {
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

    // const getNextCard = () => {
    //     // let result = Math.floor(Math.random() * cardsList.length);
    //     setDeckSize(deckSize - 1);
    //     console.log("getNextCard; cardsList.length: ", deckSize);
    //     let card = cardsList[deckSize];

    //     console.log("getNextCard ran and here is card: ", card);
    //     console.log("typeof card: ", typeof (card));
    //     return card;
    // }

    // const getNextCardTryAgain = () => {
    //     // let result = Math.floor(Math.random() * deckSize);
    //     setDeckSize(deckSize - 1);
    //     console.log("getNextCard; deckSize: ", deckSize);
    //     let card = cardsList[cardsList.length];

    //     console.log("getNextCard ran and here is card: ", card);
    //     console.log("typeof card: ", typeof (card));
    //     return card;
    // }

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
        setDeckSize(deckSize - 1);
        setCorrectList([...correctList, currentCard]);
        setCardsList((cardsList) =>
            cardsList.filter((card) => card !== currentCard)
        )

        updateCard();
        // Collect correct data
        console.log("correctList: ", correctList);

    }

    const handleWrongCards = (currentCard: CardInfo) => {
        setDeckSize(deckSize - 1);
        setWrongList([...wrongList, currentCard]);
        setCardsList((cardsList) =>
            cardsList.filter((card) => card !== currentCard)
        );
        updatePriority(currentCard.id);
        updateCard();
        console.log("wrongList: ", wrongList);
    }

    const updatePriority = async (cardId: Number) => {
        console.log("we are inside of updatePriority!");
        try {
            const response = await axios.post(`http://localhost:5000/api/deck/prio/${cardId}`, {}, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.log("updatePriority has the follow error: ", error);
        }
    }

    const handleTryAgain = (wrongList: CardInfo[]) => {
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

    // // the state of currentCard is set to false on first render.
    // // if this is the case, then the page is just now being rendered.
    // if (currentCard.side1 === "" && currentCard.side2 === "") {
    //     // const firstCardOnRender = getRandomCard(cardsData)
    //     // setCurrentCard(firstCardOnRender)
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <div className="App">

                {/* {currentCard.side1 === '' && currentCard.side2 === '' && <div>Loading...</div>} */}

                {!isStudyComplete && deckSize === 0 && (
                    <div>
                        <DisplayResults right={correctList} wrong={wrongList} />
                        <TryAgain onClick={() => handleTryAgain(wrongList)} />
                    </div>
                )}

                {isStudyComplete && deckSize === 0 && wrongList.length === 0 && (
                    <>
                        <div className="mt-10 flex items-center justify-center">
                            <h1 className="text-5xl text-lime-500 font-bold">
                                WELL DONE! 😄
                            </h1>
                        </div>
                        <Link to={'/study'} className="flex items-center justify-center">
                            <button className="text-2xl rounded font-medium border-none w-48 h-20 block mx-auto my-5 text-center no-underline text-green-600 bg-green-200 hover:bg-green-300 focus:outline-none focus:bg-green-300 shadow-md">
                                Go Back
                            </button>
                        </Link>
                    </>
                )}

                {deckSize > 0 && currentCard.side1 !== "" && currentCard.side2 !== "" &&  (
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
