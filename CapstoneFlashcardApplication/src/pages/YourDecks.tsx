import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { MdDelete, MdCancel, MdPublic, MdPublicOff, MdShare, MdContentCopy, MdClose } from 'react-icons/md'
import { FacebookShareButton, WhatsappShareButton, WhatsappIcon, FacebookIcon } from 'react-share';

import ConfirmationDialog from '../components/ConfirmationDialog';
import axiosInstance from '../axiosInstance';

const YourDecks = () => {

    const [deckList, setDeckList] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [showAddCardComponent, setShowAddCardComponent] = useState(false);
    const [showConfirmationIndex, setShowConfirmationIndex] = useState<number | null>(null);
    const [showShareBox, setShowShareBox] = useState<number | null>(null);
    const [showLinkCopied, setShowLinkCopied] = useState(false)
    const [isPublicList, setIsPublicList] = useState([]);
    const [deckName, setDeckName] = useState('');

    const handleInputChange = (e) => {
        setDeckName(e.target.value);
    }

    const handleSubmit = () => {
        console.log("sending a request to make a new deck with the name ", deckName);

        if (deckName !== '') {
            axiosInstance.post(`/api/deck/new/${deckName}`, {}, { withCredentials: true })
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
            axiosInstance.delete(`/api/deck/${encodeURIComponent(title)}`, {
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
            axiosInstance.post(`/api/deck/${title}?isPublic=${isPublic}`)
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

    const openShareBox = (index: number) => {
        setShowLinkCopied(false)
        setShowShareBox(index);
    };

    const fetchData = async () => {
        try {
            const userId = sessionStorage.getItem('id');
            console.log("userId", userId);
            const res = await axiosInstance.get(`/api/deck/user/${userId}`);
            // const res = await axios.get(`http://localhost:5000/api/deck/user/${userId}`);
            const titles = res.data.map((deck: { title: string }) => deck.title);
            setIsPublicList(res.data.map(deck => deck.isPublic));
            setDeckList(titles);
        } catch (error) {
            console.error("Error fetching deck list: ", error);
        }
    };


    // upon first load
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
    }, [deckList]);

    return (
        <>
            <div className='flex flex-col text-skin-inverted'>
                <div className='flex items-center justify-center w-800 font-sans text-skin-base font-semibold text-3xl'>Your Decks</div>
                <div className="h-screen mx-8 grid grid-cols-3 p-5">
                    {deckList.map((deckName, index) => (
                        <ul className='flex relative group cursor-pointer justify-center items-center text-center max-w-[300px] h-40 mb-20 bg-skin-inverted text-skin-inverted font-semibold text-xl transition-opacity duration-300 ease-in-out hover:bg-skin-select border border-skin-base' key={index}>
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
                                        showShareBox == index ?
                                            (<>
                                                <div className='w-40 h-8'>
                                                    <MdClose className='absolute top-1 right-1 group-hover:block w-7 h-7 cursor-pointer hover:text-skin-mid' onClick={() => openShareBox(null)} />
                                                    <FacebookShareButton url={`${window.location.origin}/study/${deckName}`}><FacebookIcon size={30} className='m-1' /></FacebookShareButton>
                                                    <WhatsappShareButton url={`${window.location.origin}/study/${deckName}`}><WhatsappIcon size={30} className='m-1' /></WhatsappShareButton>
                                                    <MdContentCopy className='inline align-top w-7 h-7 cursor-pointer hover:text-skin-mid m-1' onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/study/${deckName}`); setShowLinkCopied(true) }} />

                                                    {showLinkCopied ? <div className='block'><p className='text-sm'>Link copied!</p></div> : null}
                                                </div>
                                            </>)
                                            :
                                            (<>
                                                {
                                                    isPublicList[index] == 1 ?
                                                        (
                                                            <>
                                                                <MdShare className='absolute top-0 right-16 hidden group-hover:block w-8 h-8 cursor-pointer hover:text-skin-mid' onClick={() => openShareBox(index)} />
                                                                <MdPublic className='absolute top-0 right-8 hidden group-hover:block w-8 h-8 cursor-pointer hover:text-skin-mid' onClick={() => updateDeck(index, deckName, 0)} />
                                                            </>
                                                        ) :
                                                        (<MdPublicOff className='absolute top-0 right-8 hidden group-hover:block w-8 h-8 cursor-pointer hover:text-skin-mid' onClick={() => updateDeck(index, deckName, 1)} />)
                                                }

                                                <MdDelete className='absolute top-0 right-0 hidden group-hover:block w-8 h-8 cursor-pointer text-red-500 hover:text-red-400' onClick={() => openConfirmationDialog(index)} />
                                                <Link className="p-20" to={`/your-decks/${deckName}`} key={index}>
                                                    <p>{deckName}</p>
                                                </Link>
                                            </>)
                                    )
                            }
                        </ul>
                    ))}
                </div >

                <div className={`fixed top-1/2 left-1/2 transition ease-in-out duration-500 -translate-x-1/2 ${showAddCardComponent ? '!opacity-100 !-translate-y-1/2' : 'opacity-0 translate-y-1/2'}`}>
                    {showAddCardComponent &&
                        <div className='text-skin-dark max-w-[400px] w-full h-[450px] mx-auto flex items-center justify-center bg-skin-button px-10'>
                            <MdCancel className='absolute top-4 right-4 w-12 h-12 cursor-pointer' onClick={() => setShowAddCardComponent(false)} />
                            <div className='flex flex-col items-center justify-center'>
                                <h1 className='mb-10 font-semibold sm:text-4xl text-xl'>Make A New Deck</h1>
                                <input id='' className='mb-10 w-full border border-black' type='text' value={deckName} placeholder='New Deck Name' onChange={handleInputChange} />
                                <button className='w-[80px] h-[30px] bg-skin-button rounded-md font-medium' onClick={handleSubmit}>SUBMIT</button>
                            </div>
                        </div>
                    }
                </div>

                <div className='fixed bottom-4 left-4' onClick={() => setShowAddCardComponent(true)}>
                    <div className='flex items-center justify-center w-12 h-12 text-skin-header bg-transparent rounded-full cursor-pointer'>
                        <a className='text-7xl' href="#add-card" id="add-card-button">
                            +
                        </a>
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
