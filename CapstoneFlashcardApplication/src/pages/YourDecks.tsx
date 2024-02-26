import { useEffect, useState } from 'react'
import { Link, Route, Routes, useFetcher } from 'react-router-dom';
import { MdDelete, MdCancel, MdPublic, MdPublicOff } from 'react-icons/md'

import ConfirmationDialog from '../components/ConfirmationDialog';
import axios from 'axios'

const YourDecks = () => {

    const [deckList, setDeckList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddCardComponent, setShowAddCardComponent] = useState(false);
    const [showConfirmationIndex, setShowConfirmationIndex] = useState<number | null>(null);
    const [isPublicList, setIsPublicList] = useState([]);
    const [deckName, setDeckName] = useState('');

    const handleInputChange = (e) => {
        setDeckName(e.target.value);
    }

    const handleSubmit = () => {
        console.log("sending a request to make a new deck with the name ", deckName);

        if (deckName !== '') {
            axios.post(`http://localhost:5000/api/deck/new/${deckName}`, {}, { withCredentials: true })
                .then((res) => {
                    const response = res.data;
                    console.log("success: ", response);
                    fetchData();
                })
                .catch((error) => {
                    console.log('the following error occured when trying to post a new deck', error);
                });
        }

        setShowAddCardComponent(false);
    }

    const deleteDeck = (title) => {
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

    const updateDeck = (index, title, isPublic) => {
        try {
            axios.post(`http://localhost:5000/api/deck/${title}?isPublic=${isPublic}`)
                .then((res) => {
                    const response = res.data;
                    console.log("success: ", response);
                    console.log("Deck updated");
                    let clone = [...isPublicList]
                    clone[index] = isPublic
                    setIsPublicList(clone)
                })
                .catch((error) => {
                    console.log('The following error occurred when trying to update a card', error);
                });
        } catch (error) {
            console.log("Error occurred during deck update: ", error);
        }
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/deck/user/`, { withCredentials: true });
            const titles = res.data.map((deck: { title: string }) => deck.title);
            setDeckList(titles);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching deck list: ", error);
            setLoading(false);
        }
    };


    // upon first load
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

    }, [deckList]);

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
                                            onCancel={() => setShowConfirmationIndex(null)} />
                                    )
                                    :
                                    (
                                        // link to is the URL that leads to that page
                                        <>
                                            {isPublicList[index] == 1 ?
                                                (<><MdPublic className='absolute top-0 right-8 hidden group-hover:block w-8 h-8 cursor-pointer hover:text-gray-400' onClick={() => updateDeck(index, deckName, 0)} /></>) :
                                                (<><MdPublicOff className='absolute top-0 right-8 hidden group-hover:block w-8 h-8 cursor-pointer hover:text-gray-400' onClick={() => updateDeck(index, deckName, 1)} /></>)}
                                            <MdDelete className='absolute top-0 right-0 hidden group-hover:block w-8 h-8 cursor-pointer text-red-500 hover:text-red-400' onClick={() => openConfirmationDialog(index)} />
                                            <Link className="p-20" to={`/your-decks/${deckName}`} key={index}>
                                                <p>{deckName}</p>
                                            </Link>
                                        </>
                                    )}
                        </ul>
                    ))}

                    <div className=''>
                        {showAddCardComponent &&
                            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                <div className='max-w-[400px] w-full h-[450px] mx-auto flex items-center justify-center bg-[#282e78] px-10'>
                                    <MdCancel className='absolute top-4 right-4 w-12 h-12 cursor-pointer' onClick={() => setShowAddCardComponent(false)} />
                                    <div className='flex flex-col items-center justify-center'>
                                        <h1 className='mb-10 font-semibold sm:text-4xl text-xl'>Make A New Deck</h1>
                                        <input id='' className='mb-10 w-full border border-black' type='text' value={deckName} placeholder='New Deck Name' onChange={handleInputChange} />
                                        <button className='w-[80px] h-[30px] bg-[#00df9a] rounded-md font-medium' onClick={handleSubmit}>SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        }
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
