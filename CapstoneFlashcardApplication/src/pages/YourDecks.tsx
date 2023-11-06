import React, { useEffect, useState } from 'react'
import DeckInterface from '../components/DeckInterface';
// fa-solid fa-plus
// import NLSVG from '../assets/nl-svg.svg'
import axios from 'axios'
import { Navigate, Route, Routes, useNavigate, } from 'react-router';
import Deck from './Deck';
import { Link } from 'react-router-dom';

const YourDecks = () => {

    const navigate = useNavigate();

    const [deckList, setDeckList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/deck/1')
            .then((res) => {
                console.log(res.data);
                // setDeckList(res.data.forE(deck => deck.title));
                // res.data.forEach((deck as DeckInterface) => {

                // });
                // console.log(res);
                const titles = res.data.map((deck: { title: String; }) => deck.title);
                setDeckList(titles);
                console.log(titles);
                console.log(deckList);
            })
            .catch((error) => {
                console.log("The following error occured in axios.get: ", error);
            });
    }, []);

    return (
        <>
            <div className='flex items-center justify-center w-800 font-sans text-white font-semibold text-3xl'>Your Decks</div>

            <div className="mx-8 grid grid-cols-3 p-5">
                {deckList.map((deck, index) => (
                    <Link to={'your-decks/deck'} key={index}>
                        <ul className='flex items-center w-8/12 h-32 mb-20 bg-slate-50 text-black font-semibold text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80'
                            onClick={() => navigate('/deck')}>
                            <p className='ml-5'>{deck}</p>
                        </ul>
                    </Link>
                ))}
            </div>


            <div className='fixed bottom-6 right-6 '>
                <div className='flex items-center justify-center w-28 h-28 bg-green-700 rounded-full cursor-pointer'>
                    <h1 className='text-7xl'>
                        +
                    </h1>
                </div>
            </div>

            <Routes>
                <Route path='/deck' element={<Deck />} />
            </Routes>
        </>
    )
}

export default YourDecks