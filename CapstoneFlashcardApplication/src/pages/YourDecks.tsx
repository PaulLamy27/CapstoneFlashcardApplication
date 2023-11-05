import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
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
        axios.get('http://localhost:5000/api/deck/1')
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

    const redirectToDeck = () => {
        console.log("redirectToDeck activivated!");
        navigate(`/your-decks/deck/`);
    }

    return (
        <>
            <div className='flex items-center justify-center w-800 font-sans text-white font-semibold text-3xl'>Your Decks</div>

            <div className="h-screen mx-8 grid grid-cols-3 p-5">
                {deckList.map((deck, index) => (
                    // <p>"bg-gray-50 m-5 p-5 w-60 h-50 rounded-lg text-black text-center cursor-pointer hover:bg-slate-100 hover:bg-opacity-75 hover:text-opacity-75 transition duration-300 ease-in-out"</p>
                    // <div key={index} >
                    //     <Link to={`/your-decks/deck/${index}`}>
                    //         <ul className='flex items-center w-8/12 h-32 m-3 bg-gray-50 rounded-lg text-black font-medium text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80'
                    //         // onClick={redirectToDeck}
                    //         >
                    //             <p className='ml-5'>{deck}</p>
                    //         </ul>
                    //     </Link>
                    // </div>
                    <div key={index}>
                        <Link to={`/your-decks/${(index+1)}`}>
                            <ul className='flex items-center w-8/12 h-32 bg-gray-50 rounded-lg text-black font-medium text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80'
                                key={index}
                                onClick={redirectToDeck}>
                                <p className='ml-5'>{deck}</p>
                            </ul>
                        </Link>
                    </div>
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


        </>
    )
}

export default YourDecks