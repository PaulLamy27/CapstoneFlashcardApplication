// cardData is imported to utilize the items in the array
import cardData from '../data/cardData'
import Card from '../components/Card';
import { CardInfo } from '../components/CardInfo';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from 'react';

const Deck = () => {

    // const [cards, setCards] = useState(cardData);
    const [cardList, setCardList] = useState<CardInfo[]>([]);

    let nextId = 21;

    const [frontSide, setFrontSide] = useState('');
    const [backSide, setbackSide] = useState('');
    const [pronounced, setPronounced] = useState('');

    useEffect(() => {
        axios.get('https://localhost:5173/api/deck/1')
            .then((res) => {
                // const cardList = res.data;
                res = res.data;
                console.log(res);
                setCardList(res.data);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error fetching data:', error);
            });
    }, []);

    // test if the cardData saves
    // console.log(cards);

    // element/div that will become part of TSX 
    // iterate through the array;
    // map is a commonly used JS/TS array function
    // that takes each entry in the array and does something with it.
    // In this case, it 'maps' it with a TSX element
    // let cardList = cards.map(card =>
    //     <>
    //         <div key={card.id} className=
    //         'bg-gray-50 m-5 p-5 w-60 h-50 rounded-lg text-black text-center cursor-pointer hover:bg-opacity-75 hover:text-opacity-75 transition duration-255 ease-in-out'
    //         onClick={() => {console.log(card.id, card.side1, card.side2, card.pronunciation)}}>
    //             <h1>{card.side1}</h1>
    //             <h2>{card.side2}</h2>
    //             <h2>{card.pronunciation}</h2>
    //         </div>
    //     </>
    // )

    const addCardButtonClick = () => {

    }

    return (
        <>
            <div className="flex items-center justify-center w-800 text-black">
                <div className="flex flex-col justify-center p-10 m-10">
                    <div className='font-sans text-white font-semibold text-3xl'>Chinese Test Deck</div>
                    <div className="w-full mx-auto">
                        <input value={frontSide} placeholder='Front of Card' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setFrontSide(e.target.value)} />
                        <input value={backSide} placeholder='Back of Card' className='ml-4 rounded-lg text-center bg-gray-700'
                            onChange={e => setbackSide(e.target.value)} />
                        <input value={pronounced} placeholder='Pronunciation (Optional)' className='ml-4 rounded-lg text-center bg-gray-700'
                            onChange={e => setPronounced(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => {
                            // setCards([
                            //     { id: nextId++, side1: frontSide, side2: backSide, pronunciation: pronounced },
                            //     ...cards
                            // ]);
                        }}>CLICK TO ADD CARD</button>
                    </div>
                    <div className="grid grid-cols-3 p-5">
                        {cardList.map((card, index) => (
                            <li key={index}>
                                <p>Side 1: {card.side1}</p>
                                <p>Side 2: {card.side2}</p>
                                <p>Pronunciation: {card.pronunciation}</p>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deck

