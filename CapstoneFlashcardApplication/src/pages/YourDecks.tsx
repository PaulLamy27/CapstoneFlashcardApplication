import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { MdDelete } from 'react-icons/md'
import AddCard from '../components/AddCard';
import ConfirmationDialog from '../components/ConfirmationDialog';
import axios from 'axios'

const YourDecks = () => {

    const [deckList, setDeckList] = useState([]);
    const [showAddCardComponent, setShowAddCardComponent] = useState(false);
    const [showConfirmationIndex, setShowConfirmationIndex] = useState<number | null>(null);

    const deleteDeck = ( title ) => {
        try {
            axios.delete(`http://localhost:5000/api/deck/${encodeURIComponent(title)}`, {
            })
            .then((res) => {
                const response = res.data;
                console.log("success: ", response);
                // After successful deletion, update the deck list
                setDeckList(prevDeckList => prevDeckList.filter(deck => deck !== title));
            })
            .catch((error) => {
                console.log('The following error occurred when trying to delete a deck', error);
            });
        } catch (error) {
            console.log("Error occurred during deck deletion: ", error);
        }
        console.log("Deck deleted");
        setShowConfirmationIndex(null);
    }
    
    const openConfirmationDialog = (index: number) => {
        setShowConfirmationIndex(index);
    };

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
        <div className='flex flex-col text-black'>
            <div className='flex items-center justify-center w-800 font-sans text-white font-semibold text-3xl'>Your Decks</div>
            <div className="h-screen mx-8 grid grid-cols-3 p-5">
                {deckList.map((deckName, index) => (
                    <ul className='flex relative group cursor-pointer justify-center items-center text-center max-w-[300px] h-40 mb-20 bg-slate-50 text-black font-semibold text-xl transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80' key={index}>
                        {
                        showConfirmationIndex == index ?
                        (
                            <ConfirmationDialog
                            message="Are you sure you want to delete this deck?"
                            onConfirm={() => deleteDeck(deckName)}
                            onCancel={() => setShowConfirmationIndex(null)}/> 
                        )
                        :
                        (
                            // link to is the URL that leads to that page
                            <>
                            <MdDelete className='absolute top-0 right-0 hidden group-hover:block w-8 h-8 cursor-pointer text-red-500 hover:text-red-400' onClick={() => openConfirmationDialog(index)} />
                            <Link className="p-20" to={`/your-decks/${deckName}`} key={index}>
                                <p>{deckName}</p>
                            </Link>
                            </>
                        )}
                    </ul>
                ))}
    
                <div className=''>
                    {showAddCardComponent && <AddCard onClose={toggleAddCardComponent} />}
                </div>
            </div >


            <div className='fixed bottom-4 left-4' onClick={() => setShowAddCardComponent(true)}>
                <div className='flex items-center justify-center w-12 h-12 text-[#00df9a] bg-transparent rounded-full cursor-pointer'>
                    <h1 className='text-7xl'>
                        +
                    </h1>
                </div>
            </div>

            <Routes>
                <Route path="/your-decks/*" element={<YourDecks />} />
            </Routes>
        </div>
        </>
    )
}

export default YourDecks
