import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { MdDelete, MdPublic, MdPublicOff } from 'react-icons/md'
import AddCard from '../components/AddCard';
import ConfirmationDialog from '../components/ConfirmationDialog';
import axios from 'axios'

const User = () => {

    const [firstName, setFirstName] = useState('');
    const [userList, setUserList] = useState([])
    const searchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/search?firstname=${firstName}`);
            const data = await response.data;
            setUserList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setUserList([]);
        }
    }
    return (
        <>
        <div className="w-full mx-auto">
                        <input value={firstName} placeholder='Front of Card' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setFirstName(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => searchUser()}>
                            SEARCH</button>
        </div>
        {userList.map(user =><>
            {user.id}, {user.firstname}
        </>)}
        </>
    )
}

export default User
