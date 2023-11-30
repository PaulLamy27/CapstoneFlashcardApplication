import { useEffect, useState } from "react";
import Card from '../components/Card'
import { CardInfo } from '../components/CardInfo'
import DisplayResults from "../components/DisplayResults";
import Correct from "../components/Correct";
import Wrong from "../components/Wrong";
import TryAgain from "../components/TryAgain";

import { useParams } from 'react-router';

import axios from "axios";

import './Study.css'

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

    // dependecy array that is passed in as a param is empty, which means this will only run on first render
    useEffect(() => {
        async function populateCardList() {
            try {
                const response = await axios.get(`http://localhost:5000/api/deck/deckTitle/${deckName}`);
                const data = await response.data;
                setCardsList(data);
                console.log("cardsList: ", cardsList);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error("Since there was an error, here is the value of deckName: ", deckName);
                setCardsList([]);
            }
        }
        populateCardList();
    }, []);

    useEffect(() => {
        console.log("Updated cardsList: ", cardsList);
        setDeckSize(prevDeckSize => cardsList.length);
        setCurrentCard(getRandomCard);
        console.log(deckSize)
    }, [cardsList, deckSize, wrongList, correctList]);

    const getRandomCard = () => {
        let index = Math.floor(Math.random() * cardsList.length);
        let card = cardsList[index];
        return card;
    }

    const updateCard = () => {
        console.log("New Card!!")
        let newCard = getRandomCard();
        console.log("newCard: ", newCard);
        setCurrentCard(newCard);
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
        )
        updateCard();
    }

    const handleTryAgain = () => {
        setWrongList(Array<CardInfo>(0).fill(null));
        setCorrectList(Array<CardInfo>(0).fill(null));
        setCardsList([...wrongList])
        setDeckSize(wrongList.length);
    }

    // the state of currentCard is set to false on first render.
    // if this is the case, then the page is just now being rendered.
    if (currentCard === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="App">

                {deckSize === 0 && (
                    <div>
                        <DisplayResults right={correctList} wrong={wrongList} />
                        <TryAgain onClick={() => handleTryAgain()} />
                    </div>

                )}

                {deckSize > 0 && (
                    <>
                        <div className="cardRow">
                            <Card card={currentCard} />
                        </div>
                        <div className="buttonRow">
                            <Correct onClick={() => handleCorrectCards(currentCard)} />
                            <Wrong onClick={() => handleWrongCards(currentCard)} />
                            <TryAgain onClick={() => handleTryAgain()} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Study