// cardData is imported to utilize the items in the array
import cardData from '../data/cardData'
import Card from '../components/Card';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './Deck.css'

const Deck = () => {

    // test if the function in component is executed 
    console.log("INSIDE OF Deck, does it get here ?!?!?!?!?!    ")

    // iterate through the array;
    // map is a commonly used JS/TS array function
    // that takes each entry in the array and does something with it.
    // In this case, it 'maps' it with a TSX element
    const cardList = cardData.map(card =>
        <>
            <div className="cardListItem" key={card.id} onClick={() => console.log("Card clicked")}>
                <h3 className='side1'>{card.side1}</h3>
                <h3 className='side2'>{card.side2}</h3>
                <h3 className='pronunciation'>{card.pronunciation}</h3>
            </div>
        </>
    )

    return (
        <>
            <div className="mainDeckContainer">
                <h1 className='deckName'>Name of Deck</h1>
                <div>
                    {cardList}
                </div>
            </div>
        </>
    )
}

export default Deck

