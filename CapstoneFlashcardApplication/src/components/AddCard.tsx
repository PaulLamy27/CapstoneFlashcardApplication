import { useState } from 'react'
import axios from 'axios'
import { TiTimes } from 'react-icons/ti'

const AddCard = ({ onClose }) => {

    const [deckName, setDeckName] = useState('');

    const handleInputChange = (e) => {
        setDeckName(e.target.value);
    }

    const handleSubmit = () => {
        console.log("sending a request to make a new deck with the name ", deckName);

        if (deckName !== '') {
            // this userid of 1 should not be hardcoded in; login/logout should keep track of the user
            axios.post(`http://localhost:5000/api/deck/new/${deckName}`, {}, { withCredentials: true })
                .then((res) => {
                    const response = res.data;
                    console.log("success: ", response);
                })
                .catch((error) => {
                    console.log('the following error occured when trying to post a new deck', error);
                });
        }

        onClose();
    }

    return (
        <>
            <div className='absolute top-20 flex flex-col items-center justify-center w-6/12 inset-x-1/4 h-screen bg-[#1f2f79]'>
                <TiTimes
                    style={{ position: 'absolute', right: 0, top: 0, width: '100px', height: '100px', cursor: 'pointer' }}
                    onClick={onClose} />
                <div className='relative flex flex-col items-center justify-center'>
                    <h1 className='mb-10 font-semibold text-3xl'>Make A New Deck</h1>
                    <input id='' className='mb-10 w-full' type='text' value={deckName} placeholder='New Deck Name' onChange={handleInputChange} />
                    <button className='w-1/2 mt-3 bg-green-700' onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </>
    )
}

export default AddCard