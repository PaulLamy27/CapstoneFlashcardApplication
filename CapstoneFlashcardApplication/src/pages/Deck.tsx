import cardData from '../data/cardData'
import Card from '../components/Card';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './Deck.css'

const Deck = () => {

    // test if the function in component is executed 
    console.log("INSIDE OF Deck, does it get here ?!?!?!?!?!    ")

    const cardList = cardData.map(card => 
        <>
            <Card key={card.id} card={card}/>
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

