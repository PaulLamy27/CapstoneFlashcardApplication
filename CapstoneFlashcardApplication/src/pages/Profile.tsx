import { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import YourDecks from './YourDecks';
import axios from "axios";

const Profile = ({handleThemeChange}) => {
    const [deckList, setDeckList] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/deck/user/publicdecks/${username}`, { withCredentials: true })
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
            
    }, [username]);


    return (
    <>
    <div>
        <select id="themes" onChange={handleThemeChange}>
            <option value="" selected>Default</option>
            <option value="light">Light</option>
        </select>
    </div>
        <div className='text-skin-base'>
            <div className='max-w-[800px] mt-[75px] w-full h-screen mx-auto flex flex-col justify-center'>
                <div className='flex flex-row'>
                    <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6 pr-4'>Hello,</h1>
                    <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6 text-skin-header'>{username}</h1>
                </div>
                <div>
                    <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6'>Public Decks:</h1>
                    <div className="mx-8 grid grid-cols-3 p-5">
                        {deckList.map((deckName, index) => (
                            // link to is the URL that leads to that page
                            <Link to={`/study/${deckName}`} key={index}>
                                <ul className='flex items-center w-8/12 h-32 mb-20 bg-skin-inverted text-skin-inverted font-semibold text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-skin-select'>
                                    <p className='ml-5'>{deckName}</p>
                                </ul>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Routes>
            <Route path="/your-decks/*" element={<YourDecks />} />
        </Routes>
    </>
    )
}

export default Profile