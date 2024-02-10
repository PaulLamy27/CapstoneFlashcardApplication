import { CardInfo } from '../components/CardInfo';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MdDelete } from 'react-icons/md'
import ConfirmationDialog from '../components/ConfirmationDialog';

const Deck = () => {

    const { deckName } = useParams();
    console.log(deckName);

    const [cardList, setCardList] = useState<CardInfo[]>([]);

    console.log("cardList: ", cardList);

    const [frontSide, setFrontSide] = useState('');
    const [backSide, setbackSide] = useState('');
    const [pronounced, setPronounced] = useState('');

    const [q, setQ] = useState("");

    const [showConfirmationIndex, setShowConfirmationIndex] = useState<number | null>(null);

    const search = (items: CardInfo[]) => {
        return items.filter((item: CardInfo) => {
            return (item.side1.toLowerCase().indexOf(q.toLowerCase()) > -1) ||
                (item.side2.toLowerCase().indexOf(q.toLowerCase()) > -1) ||
                (item.pronunciation == undefined ? false : (item.pronunciation.indexOf(q.toLowerCase()) > -1))
        });
    }

    const updateList = async () => {
        await addCard();
        populateCardList();
        setFrontSide('');
        setbackSide('');
        setPronounced('');
    }

    const addCard = async () => {
        console.log("sending a request to make a new deck with the name ", deckName);
        if (deckName !== '') {
            // if (pronounced) {
            //     axios.post(`http://localhost:5000/api/deck/${deckName}/card?side1=${frontSide}&side2=${backSide}&pronunciation=${pronounced}&priority=1`, {}, { withCredentials: true })
            //         .then((res) => {
            //             const response = res.data;
            //             console.log("success: ", response);

            //         })
            //         .catch((error) => {
            //             console.log('the following error occured when trying to post a new card', error);
            //         });
            // } else {
            //     axios.post(`http://localhost:5000/api/deck/${deckName}/card?side1=${frontSide}&side2=${backSide}&priority=1`, {}, { withCredentials: true })
            //         .then((res) => {
            //             const response = res.data;
            //             console.log("success: ", response);

            //         })
            //         .catch((error) => {
            //             console.log('the following error occured when trying to post a new card', error);
            //         });
            // }
            try {
                if (pronounced) {
                    await axios.post(`http://localhost:5000/api/deck/${deckName}/card?side1=${frontSide}&side2=${backSide}&pronunciation=${pronounced}&priority=1`, {}, { withCredentials: true });
                } else {
                    await axios.post(`http://localhost:5000/api/deck/${deckName}/card?side1=${frontSide}&side2=${backSide}&priority=1`, {}, { withCredentials: true });
                }

                console.log("success");
            } catch (error) {
                console.log('the following error occurred when trying to post a new card', error);
            }
        }
    }

    const deleteCard = (side1, side2, pronunciation) => {
        try {
            axios.delete(`http://localhost:5000/api/deck/${encodeURIComponent(deckName)}/card`, {
                params: {
                    side1: side1,
                    side2: side2,
                    pronunciation: pronunciation,
                    priority: 1
                }
            })
            .then((res) => {
                const response = res.data;
                console.log("success: ", response);
                // After successful deletion, update the card list
                populateCardList();
            })
            .catch((error) => {
                console.log('The following error occurred when trying to delete a card', error);
            });
        } catch (error) {
            console.log("Error occurred during card deletion: ", error);
        }
        console.log("Card deleted");
        setShowConfirmationIndex(null);
    }
    
    const openConfirmationDialog = (index: number) => {
        setShowConfirmationIndex(index);
    };

    const populateCardList = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/deck/deckTitle/${deckName}`);
            const data = await response.data;
            setCardList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error("Since there was an error, here is the value of deckName: ", deckName);
            setCardList([]);
        }
    }

    useEffect(() => {
        populateCardList();
    }, [deckName]);

    return (
        <>
            <div className="flex items-center justify-center w-800 text-black">
                <div className="flex flex-col justify-center p-10 m-10">
                    <div className='font-sans text-white font-semibold text-3xl'>{deckName}</div>
                    <div className="w-full mx-auto">
                        <input value={frontSide} placeholder='Front of Card' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setFrontSide(e.target.value)} />
                        <input value={backSide} placeholder='Back of Card' className='ml-4 rounded-lg text-center bg-gray-700'
                            onChange={e => setbackSide(e.target.value)} />
                        <input value={pronounced} placeholder='Pronunciation (Optional)' className='ml-4 rounded-lg text-center bg-gray-700'
                            onChange={e => setPronounced(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => updateList()}>
                            CLICK TO ADD CARD</button>
                    </div>
                    <div className="w-full mx-auto">
                        <input value={q} placeholder='Search' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setQ(e.target.value)} />
                    </div>
                    {/* (isLoading ? (
                    <h1>Currently loading...</h1>
                    ) : (<div className="grid grid-cols-3 p-5">
                        {cardList.map((card, index) => (
                            <li key={index}>
                                <p>{card.side1}</p>
                                <p>{card.side2}</p>
                                <p>{card.pronunciation}</p>
                            </li>
                        ))}
                    </div>)) */}
                    <div className="grid grid-cols-3 p-5">
                        {search(cardList).map((card, index) => (
                            <li className=' relative group cursor-pointer font-martel-sans font-rubik bg-gray-300 hover:bg-opacity-80 block text-center p-5 m-5' key={index}>
                                {
                                showConfirmationIndex == index ?
                                ( 
                                <ConfirmationDialog
                                message="Are you sure you want to delete this card?"
                                onConfirm={() => deleteCard(card.side1, card.side2, card.pronunciation)}
                                onCancel={() => setShowConfirmationIndex(null)}/>
                                )
                                :
                                (
                                <>
                                <MdDelete className='absolute top-0 right-0 hidden group-hover:block w-8 h-8 cursor-pointer text-red-500 hover:text-red-400' onClick={() => openConfirmationDialog(index)} />
                                <p className='text-xl p-0 text-black'>{card.side1}</p>
                                <p className='text-xl p-0 text-black'>{card.side2}</p>
                                <p className='text-m p-0 text-gray-500 margin-0 '>{card.pronunciation}</p>
                                </>
                                )}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

    // useEffect(() => {

    // }, [deckName]);

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


}

export default Deck