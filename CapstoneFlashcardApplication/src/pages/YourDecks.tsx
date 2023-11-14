import React, { useEffect, useState } from 'react'
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import Deck from './Deck';
import DeckInterface from '../components/DeckInterface';
import AddCard from '../components/AddCard';
// import NLSVG from '../assets/nl-svg.svg'
import axios from 'axios'

const YourDecks = () => {

    const navigate = useNavigate();

    const [deckList, setDeckList] = useState([]);
    const [showAddCardComponent, setShowAddCardComponent] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/deck/user/`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                const titles = res.data.map((deck: { title: String; }) => deck.title);
                setDeckList(titles);
                console.log(titles);
                console.log(deckList);
            })
            .catch((error) => {
                console.log("The following error occured in axios.get: ", error);
            });
    }, []);

    const toggleAddCardComponent = () => {
        setShowAddCardComponent(!showAddCardComponent);
    }

    return (
        <>
            <div className='flex items-center justify-center w-800 font-sans text-white font-semibold text-3xl'>Your Decks</div>

            <div className="h-screen mx-8 grid grid-cols-3 p-5">
                {deckList.map((deckName, index) => (
                    // link to is the URL that leads to that page
                    <Link to={`/your-decks/${deckName}`} key={index}>
                        <ul className='flex items-center w-8/12 h-32 mb-20 bg-slate-50 text-black font-semibold text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80'>
                            <p className='ml-5'>{deckName}</p>
                        </ul>
                    </Link>
                ))}
                <div className=''>
                    {showAddCardComponent && <AddCard onClose={toggleAddCardComponent} />}
                </div>
            </div >


            <div className='fixed bottom-6 right-6' onClick={() => setShowAddCardComponent(true)}>
                <div className='flex items-center justify-center w-28 h-28 bg-green-700 rounded-full cursor-pointer'>
                    <h1 className='text-7xl'>
                        +
                    </h1>
                </div>
            </div>

            <Routes>
                <Route path="/your-decks/*" element={<YourDecks />} />
            </Routes>
        </>
    )
}

export default YourDecks