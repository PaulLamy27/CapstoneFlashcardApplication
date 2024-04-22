import { CardInfo } from '../components/CardInfo';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MdDelete, MdEdit } from 'react-icons/md'
import ConfirmationDialog from '../components/ConfirmationDialog';
// import Translate from '../components/Translate';

const Deck = () => {

    const { deckName } = useParams();
    const [cardList, setCardList] = useState<CardInfo[]>([]);

    const [frontSide, setFrontSide] = useState('');
    const [backSide, setBackSide] = useState('');
    const [pronounced, setPronounced] = useState('');

    const [frontSideUpdate, setFrontSideUpdate] = useState('');
    const [backSideUpdate, setBackSideUpdate] = useState('');
    const [pronouncedUpdate, setPronouncedUpdate] = useState('');
    const [showUpdateBox, setShowUpdateBox] = useState<number | null>(null);

    // const [inputText, setInputText] = useState('');
    const [isTranslateAvailable, setIsTranslateAvailable] = useState(false);
    // const [outputText, setOutputText] = useState('');
    const [languageList, setLanguageList] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [inputLanguage, setInputLanguage] = useState('English');
    // const [outputLanguage, setOutputLanguage] = useState('Armenian');
    const [inputLanguageCode, setInputLanguageCode] = useState('en');
    const [outputLanguageCode, setOutputLanguageCode] = useState('hy');
    // const [data, setData] = useState(null);

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
        setBackSide('');
        setPronounced('');
    }

    const addCard = async () => {
        console.log("sending a request to make a new deck with the name ", deckName);
        if (deckName !== '') {
            try {
                if (pronounced) {
                    await axiosInstance.post(`/api/deck/${deckName}/card?side1=${frontSide}&side2=${backSide}&pronunciation=${pronounced}&priority=1`);
                } else {
                    await axiosInstance.post(`/api/deck/${deckName}/card?side1=${frontSide}&side2=${backSide}&priority=1`);
                }

                console.log("success");
            } catch (error) {
                console.log('the following error occurred when trying to post a new card', error);
            }
        }
    }

    const deleteCard = (side1, side2, pronunciation) => {
        try {
            axiosInstance.delete(`/api/deck/${encodeURIComponent(deckName)}/card`, {
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

    const updateCard = (id: number, side1, side2) => {
        let newSide1 = frontSideUpdate == '' ? side1 : frontSideUpdate
        let newSide2 = backSideUpdate == '' ? side2 : backSideUpdate
        try {
            axiosInstance.post(`/api/deck/card/${id}`, {
                side1: newSide1,
                side2: newSide2,
                pronunciation: pronouncedUpdate
            })
                .then((res) => {
                    const response = res.data;
                    console.log("success: ", response);
                    populateCardList();
                    console.log("Card updated");
                })
                .catch((error) => {
                    console.log('The following error occurred when trying to update a card', error);
                });
        } catch (error) {
            console.log("Error occurred during card update: ", error);
        }
        setShowUpdateBox(null);
    }

    const openEditBox = (index: number) => {
        setBackSideUpdate('')
        setFrontSideUpdate('')
        setPronouncedUpdate('')
        setShowUpdateBox(index);
    };

    const populateCardList = async () => {
        try {
            const userId = sessionStorage.getItem('id');
            console.log("userId", userId);
            const response = await axiosInstance.get(`/api/deck/deckTitle/${deckName}/${userId}`);
            const data = await response.data;
            setCardList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error("Since there was an error, here is the value of deckName: ", deckName);
            setCardList([]);
        }
    }

    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://translate-plus.p.rapidapi.com/',
            headers: {
                'X-RapidAPI-Key': '7a95d19361mshbdbf1bc86a88d5bp1f6589jsn386944c7fa2b',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com',
            },
        };

        try {
            axios.request(options)
                .then((res) => {
                    if (res) {
                        console.log("res.data: ", res.data);
                        const supportedLanguages = res.data.supported_languages;
                        setLanguageList(supportedLanguages);
                        console.log("languageList is empty here: ", languageList);
                    }
                    else {
                        console.error("No res");
                    }
                })
        } catch (error) {
            console.log();
        }
    }

    // useEffect will run when the component mounts first AND when the value of languageList changes
    useEffect(() => {
        if (languageList.length <= 0) {
            fetchData();
        } else {
            console.log(loading);
            setLoading(false);
        }

        console.log("useEffect ran; languageList: ", languageList);
    }, [languageList])

    const translateData = async () => {
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '7a95d19361mshbdbf1bc86a88d5bp1f6589jsn386944c7fa2b',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: frontSide,
                source: inputLanguageCode,
                target: outputLanguageCode,
            },
        };

        try {
            const translationOutput = await axios.request(options);
            setBackSide(translationOutput.data.translations.translation);
        } catch (error) {
            console.error(error);
        }
    };

    const handleIsLanguageToggle = () => {
        setIsTranslateAvailable(!isTranslateAvailable);
        console.log("But when the application crashes: languageList is populated: ", languageList);
    }

    const handleInputLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        setInputLanguageCode(selectedCode);
    };

    const handleOutputLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        setOutputLanguageCode(selectedCode);
    };

    useEffect(() => {
        populateCardList();
    }, [deckName]);

    return (
        <>
            <div className="flex items-center justify-center w-800 text-black">
                <div className="flex flex-col justify-center p-10 m-10">
                    <div className='font-sans text-white font-semibold text-3xl'>{deckName}</div>
                    <div>
                        <div className='flex my-2'>
                            <label className="inline-flex items-center cursor-pointer" >
                                <input type="checkbox" value="" className="sr-only peer" onClick={handleIsLanguageToggle} />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3763c4]"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
                            </label>
                            <h1 className='text-white font-semibold'>Is this deck for studying a language?</h1>
                        </div>
                    </div>
                    {
                        isTranslateAvailable && (
                            <div className="flex w-full mx-auto items-center my-1">
                                <select className='max-h-6 mx-3' onChange={handleInputLanguageChange}>
                                    <option value="" disabled selected>Input language</option>
                                    {Object.entries(languageList).map(([language, inputLanguageCode]) => (
                                        <option key={inputLanguageCode} value={inputLanguageCode}>{language}</option>
                                    ))};
                                </select>
                                <select className='max-h-6 mx-3' onChange={handleOutputLanguageChange}>
                                    <option value="" disabled selected>Output language</option>
                                    {Object.entries(languageList).map(([language, outputLanguageCode]) => (
                                        <option key={outputLanguageCode} value={outputLanguageCode}>{language}</option>
                                    ))};
                                </select>
                                {/* <h1 className='text-white font-semibold'>Cards will be autotranslated</h1> */}
                                <button className="border rounded-lg m-5 p-2 bg-[#00df29] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={translateData}>
                                    TRANSLATE</button>
                            </div>)
                    }
                    <div className="w-full mx-auto">
                        <input value={frontSide} placeholder='Front of Card' className='ml-4 rounded-lg text-center bg-gray-700 hover text-white'
                            onChange={e => setFrontSide(e.target.value)} />
                        <input value={backSide} placeholder='Back of Card' className='ml-4 rounded-lg text-center bg-gray-700 text-white'
                            onChange={e => setBackSide(e.target.value)} />
                        <input value={pronounced} placeholder='Pronunciation (Optional)' className='ml-4 rounded-lg text-center bg-gray-700 text-white'
                            onChange={e => setPronounced(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => updateList()}>
                            CLICK TO ADD CARD</button>
                    </div>
                    <div className="w-full mx-auto">
                        <input value={q} placeholder='Search' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setQ(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 p-5">
                        {search(cardList).map((card, index) => (
                            <li className=' relative group cursor-pointer font-martel-sans font-rubik bg-gray-300 hover:bg-opacity-80 block text-center p-5 m-5' key={index}>
                                {
                                    showConfirmationIndex == index ?
                                        (
                                            <ConfirmationDialog
                                                message="Are you sure you want to delete this card?"
                                                onConfirm={() => deleteCard(card.side1, card.side2, card.pronunciation)}
                                                onCancel={() => setShowConfirmationIndex(null)} />
                                        )
                                        :
                                        (
                                            showUpdateBox == index ?
                                                (
                                                    <>
                                                        <input value={frontSideUpdate} placeholder={card.side1} className='m-2 rounded-lg text-center bg-gray-100 hover'
                                                            onChange={e => setFrontSideUpdate(e.target.value)} />
                                                        <input value={backSideUpdate} placeholder={card.side2} className='m-1 rounded-lg text-center bg-gray-100 hover'
                                                            onChange={e => setBackSideUpdate(e.target.value)} />
                                                        <input value={pronouncedUpdate} placeholder={card.pronunciation} className='m-2 rounded-lg text-center bg-gray-100 hover'
                                                            onChange={e => setPronouncedUpdate(e.target.value)} />
                                                        <div className="block">
                                                            <button className="inline-block rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => updateCard(card.id, card.side1, card.side2)}>
                                                                Update
                                                            </button>
                                                            <button className="inline-block rounded-lg m-5 p-2 bg-red-400 hover:bg-red-300 text-[#13163b] font-medium" onClick={() => openEditBox(null)}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <MdEdit className='absolute hidden group-hover:block top-0 right-7 w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-400' onClick={() => openEditBox(index)} />
                                                        <MdDelete className='absolute hidden group-hover:block top-0 right-0 w-8 h-8 cursor-pointer text-red-500 hover:text-red-400' onClick={() => openConfirmationDialog(index)} />
                                                        <p className='mt-5 text-xl p-0 text-black'>{card.side1}</p>
                                                        <p className='text-xl p-0 text-black'>{card.side2}</p>
                                                        <p className='text-m p-0 text-gray-500 margin-0 '>{card.pronunciation}</p>
                                                    </>
                                                )
                                        )
                                }
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deck