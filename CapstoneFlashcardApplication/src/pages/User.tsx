import { useState } from 'react'
import axios from 'axios'

const User = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userList, setUserList] = useState([])
    const searchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/search?firstname=${firstName}&lastname=${lastName}&username=${username}&email=${email}`);
            const data = await response.data;
            setUserList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setUserList([]);
        }
    }
    return (
        <>
            <div className="flex items-center justify-center w-800 text-black">
                <div className="flex flex-col justify-center p-10 m-10">
                    <div className="w-800 mx-auto">
                        <input value={firstName} placeholder='First name' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setFirstName(e.target.value)} />
                        <input value={lastName} placeholder='Last name' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setLastName(e.target.value)} />
                        <input value={username} placeholder='Username' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setUsername(e.target.value)} />
                        <input value={email} placeholder='Email' className='ml-4 rounded-lg text-center bg-gray-700 hover'
                            onChange={e => setEmail(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-[#00df9a] hover:bg-[#4DE3B5] text-[#13163b] font-medium" onClick={() => searchUser()}>
                            SEARCH</button>
                    </div>
                    <div className="grid grid-cols-3 p-5">
                        {userList.map(user => <>
                            <li className=' relative group cursor-pointer font-martel-sans font-rubik bg-gray-300 hover:bg-opacity-80 block text-center p-5 m-5'>
                                < p className='text-xl font-semibold'>{user.firstname} {user.lastname}</p>
                                Username: {user.username} <br />
                                Email: {user.email} <br />
                            </li>
                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default User