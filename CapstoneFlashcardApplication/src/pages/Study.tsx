import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
// import { MdLowPriority } from "react-icons/md";
import Card from '../components/Card'
import { CardInfo } from '../components/CardInfo'
import DisplayResults from "../components/DisplayResults";

import Correct from "../components/Correct";
import Wrong from "../components/Wrong";
import TryAgain from "../components/TryAgain";

import { useParams } from 'react-router';

import './Study.css'
import axiosInstance from "../axiosInstance";
//import YourDecks from "./YourDecks";

const Study = () => {

    const { deckName } = useParams();

    const [isRandomOrPriority, setIsRandomOrPriority] = useState(true);
    const [isStudyRandom, setIsStudyRandom] = useState(false);
    const [isStudyPriority, setIsStudyPriority] = useState(false);

    const [cardsList, setCardsList] = useState<CardInfo[]>([]);
    const [deckSize, setDeckSize] = useState(cardsList.length);
    const [currentCard, setCurrentCard] = useState<CardInfo>({
        id: 0,
        side1: "",
        side2: "",
        priority: 0
    });
    const [isResults, setIsResults] = useState(false);
    const [correctList, setCorrectList] = useState(Array<CardInfo>(0).fill(null));
    const [wrongList, setWrongList] = useState(Array<CardInfo>(0).fill(null));
    const [isStudyComplete, setIsStudyComplete] = useState(false);

    async function populateCardList() {
        try {
            const userId = sessionStorage.getItem('id');
            console.log("userId", userId);
            const response = await axiosInstance.get(`/api/deck/studyDeck/${deckName}/${userId}`);
            // const response = await axios.get(`http://localhost:5000/api/deck/studyDeck/${deckName}/${userId}`);
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

    useEffect(() => {
        populateCardList();
    }, []);

    useEffect(() => {
        console.log("Updated cardsList: ", cardsList);
        // let prevDeckSize = cardsList.length;
        setDeckSize(() => {
            const newDeckSize = cardsList.length;
            console.log("setDeckSize(cardsList.length); has just run: ", newDeckSize);
            return newDeckSize;
        });
        // legacy
        //if (deckSize > 0) { setCurrentCard(getNextCard); }
        if (deckSize > 0 && !isStudyComplete) {
            setCurrentCard(getRandomCard);
        } else if (deckSize === 0 && !isStudyComplete) {
            populateCardList();
            console.log(setIsResults);
            console.log(isResults);
        }
    }, [cardsList]);

    const getRandomCard = () => {
        let result = Math.floor(Math.random() * cardsList.length);
        console.log("getRandomCard; result: ", result);
        let card = cardsList[result];
        console.log("getRandomCard ran and here is card: ", card);
        console.log("typeof card: ", typeof (card));
        return card;
    }

    // const getNextCard = () => {
    //     let card;
    //     if (cardListIndex === 0) {
    //         card = cardsList[cardListIndex];
    //     } else {
    //         setCardListIndex(cardListIndex + 1)
    //         card = cardsList[cardListIndex];
    //     }
    //     // let result = Math.floor(Math.random() * cardsList.length);
    //     // console.log("getRandomCard; result: ", result);
    //     console.log("getRandomCard ran and here is card: ", card);
    //     console.log("typeof card: ", typeof (card));
    //     return card;
    // }

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
        setDeckSize(deckSize - 1);
        setCorrectList([...correctList, currentCard]);
        setCardsList((cardsList) =>
            cardsList.filter((card) => card !== currentCard)
        )
        updateCard();
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
            const userId = sessionStorage.getItem('id');
            console.log("userId", userId);
            const response = await axiosInstance.post(`/api/deck/prio/${cardId}/${userId}`);
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

    const handleStudyRandom = () => {
        setIsRandomOrPriority(false);
        setIsStudyRandom(true);
        console.log(isStudyRandom);
        console.log("CardList handleStudyRandom: ", cardsList);
    }

    const handleStudyPriority = () => {
        setIsRandomOrPriority(false);
        setIsStudyPriority(true);
        console.log(isStudyPriority);
        console.log("CardList handleStudyPriority: ", cardsList);
        const sortedCards = [...cardsList].sort((a, b) => b.priority - a.priority);
        console.log("sortedCards: ", sortedCards);
        setCardsList(sortedCards);
    }

    // the state of currentCard is set to false on first render.
    // if this is the case, then the page is just now being rendered.
    if (currentCard === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="App">

                {isRandomOrPriority && (
                    <div className="mx-auto mt-10">
                        <div className="flex flex-wrap justify-center bg-transparent">
                            <div className="text-4xl text-white font-semibold p-5">
                                Choose How You Want To Study!
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="grid gap-4 mt-11">
                                <button onClick={handleStudyRandom} className="text-lg border-none w-48 h-16 block no-underline text-black shadow-md bg-teal-400 px-4 py-2 cursor-pointer transition-transform duration-75 transform hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                    <div className="flex justify-center items-center">
                                        {/* <GiPerspectiveDiceSixFacesRandom /> */}
                                        <p className="text-xl font-medium">
                                            Freeplay (Random)
                                        </p>
                                    </div>
                                </button>
                                <button onClick={handleStudyPriority} className="text-lg border-none w-48 h-16 block no-underline text-black shadow-md bg-teal-400 px-4 py-2 cursor-pointer transition-transform duration-75 transform hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                    <div className="flex justify-center items-center">
                                        {/* <div className="l-0">
                                            <MdLowPriority />
                                        </div> */}
                                        <p className="text-xl font-medium">
                                            Priority
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!isStudyComplete && deckSize === 0 && (
                    <div>
                        <DisplayResults right={correctList} wrong={wrongList} />
                        <TryAgain onClick={() => handleTryAgain(wrongList)} />
                    </div>
                )}

                {isStudyComplete && deckSize === 0 && wrongList.length === 0 && (
                    <>
                        <div className="mt-10 flex items-center justify-center">
                            <h1 className="text-5xl text-skin-header font-bold">
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

                {!isRandomOrPriority && deckSize > 0 && (
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
