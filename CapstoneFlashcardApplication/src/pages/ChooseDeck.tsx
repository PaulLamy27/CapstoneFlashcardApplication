import axiosInstance from '../axiosInstance';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const ChooseDeck = () => {
    const [deckList, setDeckList] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        console.log("userId", userId);
        axiosInstance.get(`/api/deck/user/${userId}`)
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

    return (
        <>
            <div className='flex items-center justify-center w-800 font-sans text-white font-semibold text-3xl'>Choose Deck to Study From</div>

            <div className="h-screen mx-8 grid grid-cols-3 p-5">
                {deckList.map((deckName, index) => (
                    // link to is the URL that leads to that page
                    <Link to={`/study/${deckName}`} key={index}>
                        <ul className='flex cursor-pointer justify-center items-center text-center max-w-[300px] h-40 mb-20 bg-slate-50 text-black font-semibold text-xl transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80' key={index}>
                            <p className='p-20'>{deckName}</p>
                        </ul>
                    </Link>
                ))}
            </div >
        </>
    )
}

export default ChooseDeck
