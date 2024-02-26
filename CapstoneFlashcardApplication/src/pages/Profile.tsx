import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import YourDecks from './YourDecks';
import axios from "axios";

const Profile = () => {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [deckList, setDeckList] = useState([]);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true)
                setName(res.data.username)
                console.log("Username ", res.data.username)
            }
            else {
                setAuth(false)
                console.log("auth: ", auth);
                console.log("message: ", message);
                setMessage(res.data.Error)
            }
        })
        .catch(err => console.log(err));
    }, [])

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


    return (
    <>
        <div className='text-white'>
            <div className='max-w-[800px] mt-[75px] w-full h-screen mx-auto flex flex-col justify-center'>
                <div className='flex flex-row'>
                    <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6 pr-4'>Hello,</h1>
                    <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6 text-[#00df9a]'>{name}</h1>
                </div>
                <div>
                    <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6'>Public Decks:</h1>
                    <div className="mx-8 grid grid-cols-3 p-5">
                        {deckList.map((deckName, index) => (
                            // link to is the URL that leads to that page
                            <Link to={`/your-decks/${deckName}`} key={index}>
                                <ul className='flex items-center w-8/12 h-32 mb-20 bg-slate-50 text-black font-semibold text-xl cursor-pointer transition-opacity duration-300 ease-in-out hover:bg-slate-200 hover:opacity-80'>
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