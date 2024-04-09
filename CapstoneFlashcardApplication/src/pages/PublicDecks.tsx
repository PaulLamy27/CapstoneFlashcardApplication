import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const PublicDecks = () => {

    const [deckList, setDeckList] = useState([]);
    const [filteredDeckList, setFilteredDeckList] = useState([]);
    const [q, setQ] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/deck/publicdecks`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                const titles = res.data.map((deck: { title: String; }) => deck.title);
                setDeckList(titles);
                setFilteredDeckList(titles);
                console.log(titles);
                console.log(deckList);
            })
            .catch((error) => {
                console.log("The following error occured in axios.get: ", error);
            });
    }, []);

    const handleSearch = () => {
        const filteredDecks = deckList.filter(deckName => deckName.toLowerCase().includes(q.toLowerCase()));
        setFilteredDeckList(filteredDecks);
        // Handle filteredDecks here, you can set it to a state for rendering or perform any other action
        console.log(filteredDecks);
    }


    return (
        <>
            <div className="flex items-center justify-center w-800 text-skin-inverted">
                <div className="flex flex-col justify-center p-10 m-10">
                    <div className="w-800 mx-auto">
                        <input value={q} placeholder='Deck Name' className='ml-4 rounded-lg text-center bg-skin-inverted hover'
                        onChange={e => setQ(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-skin-button hover:bg-skin-buttonselect text-skin-dark font-medium" onClick={() => handleSearch()}>
                            SEARCH
                        </button>
                    </div>
                    <div className="mx-8 grid grid-cols-3 p-5">
                        {filteredDeckList.map((deckName, index) => (
                            // link to is the URL that leads to that page
                            <Link to={`/study/${deckName}`} key={index}>
                                <ul className='flex items-center w-8/12 h-32 mb-20 bg-skin-inverted text-skin-inverted font-semibold text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-skin-select border-skin-base' key={index}>
                                    <p className='ml-5'>{deckName}</p>
                                </ul>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublicDecks
