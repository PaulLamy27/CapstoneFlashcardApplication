// cardData is imported to utilize the items in the array
import cardData from '../data/cardData'
import Card from '../components/Card';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
            <div key={card.id} className='bg-gray-50 m-5 p-5 w-60 h-50 rounded-lg text-black text-center'>
                <h1>{card.side1}</h1>
                <h2>{card.side2}</h2>
                <h2>{card.pronunciation}</h2>
            </div>
        </>
    )

    return (
        <>
            <div className="flex items-center justify-center w-800 text-white">
                <div className="flex flex-col justify-center p-10 m-10">
                    <h1>Name of Deck</h1>
                    <div className="w-full mx-auto">
                        <input value={frontSide}
                            onChange={e => setFrontSide(e.target.value)} />
                        <input value={backSide}
                            onChange={e => setbackSide(e.target.value)} />
                        <input value={pronounced}
                            onChange={e => setPronounced(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => {
                            setCards([
                                ...cards,
                                {id: nextId++, side1: frontSide,  side2: backSide, pronunciation: pronounced}
                            ]);
                        }}>CLICK TO ADD CARD</button>
                    </div>
                    <div className="grid grid-cols-3 p-5">
                        {...cardList}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deck

