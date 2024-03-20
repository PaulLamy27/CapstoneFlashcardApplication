import { useState } from 'react'
import axios from 'axios'
import { MdCancel } from 'react-icons/md'

const AddCard = ({ onClose }) => {

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
                })
                .catch((error) => {
                    console.log('the following error occured when trying to post a new deck', error);
                });
        }

        onClose();
    }

    return (
        <div className='sticky top-0'>
            <div className='max-w-[400px] mx-auto'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[400px] flex w-full h-[500px] mx-auto items-center justify-center bg-white'>
                    <div className='flex flex-col items-center justify-center'>
                        <MdCancel className='absolute top-4 right-4 w-12 h-12 cursor-pointer' onClick={onClose} />
                        <h1 className='mb-10 font-semibold sm:text-4xl text-xl'>Make A New Deck</h1>
                        <input id='' className='mb-10 w-full border border-black' type='text' value={deckName} placeholder='New Deck Name' onChange={handleInputChange} />
                        <button className='w-[80px] h-[30px] bg-skin-button rounded-md font-medium' onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCard
