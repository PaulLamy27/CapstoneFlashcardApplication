import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const ChooseDeck = () => {
    const [deckList, setDeckList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/deck/user/', {withCredentials: true})
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
            <div className='flex mx-auto items-center justify-center w-800 font-sans text-white font-semibold text-3xl'>Choose Deck to Study From</div>

            <div className="h-screen grid grid-cols-3 p-5">
                {deckList.map((deckName, index) => (
                    // link to is the URL that leads to that page
                    <Link className='flex cursor-pointer justify-center items-center text-center max-w-[300px] h-40 mb-20 bg-slate-50 text-black font-semibold text-xl transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80' to={`/study/${deckName}`} key={index}>
                    <ul  key={index}>
                            <p className='p-20'>{deckName}</p>
                        </ul>
                    </Link>
                ))}
            </div >
        </>
    )
}

export default ChooseDeck
