// cardData is imported to utilize the items in the array
import cardData from '../data/cardData'
import Card from '../components/Card';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './Deck.css'
import { useState } from 'react';

const Deck = () => {

    const [cards, setCards] = useState(cardData);

    let nextId = 21;

    const [frontSide, setFrontSide] = useState('');
    const [backSide, setbackSide] = useState('');
    const [pronounced, setPronounced] = useState('');


    // test if the cardData saves
    // console.log(cards);

    // element/div that will become part of TSX 
    // iterate through the array;
    // map is a commonly used JS/TS array function
    // that takes each entry in the array and does something with it.
    // In this case, it 'maps' it with a TSX element
    let cardList = cards.map(card =>
        <>
            <div className="cardListItem" key={card.id} onClick={() => console.log("Card clicked")}>
                <div className="contentContainer">
                    <h1 className='side1'>{card.side1}</h1>
                    <h1 className='side2'>{card.side2}</h1>
                    <h1 className='pronunciation'>{card.pronunciation}</h1>
                </div>
            </div>
        </>
    )

    return (
        <>
            <div className="mainDeckContainer">
                <h1 className='deckName'>Name of Deck</h1>
                <div>
                    <div>
                        <input value={frontSide}
                            onChange={e => setFrontSide(e.target.value)} />
                        <input value={backSide}
                            onChange={e => setbackSide(e.target.value)} />
                        <input value={pronounced}
                            onChange={e => setPronounced(e.target.value)} />
                        <button onClick={() => {
                            setCards([
                                ...cards,
                                {id: nextId++, side1: frontSide,  side2: backSide, pronunciation: pronounced}
                            ]);
                        }}>CLICK TO ADD CARD</button>
                    </div>
                    {cardList}
                </div>
            </div>
        </>
    )
}

export default Deck

