import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const User = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userList, setUserList] = useState([])

    const searchUser = async () => {
        try {
            let url = `/api/user/search`;
            if (firstName) url += `?firstname=${firstName}`;
            if (lastName) url += `&lastname=${lastName}`;
            if (username) url += `&username=${username}`;
            if (email) url += `&email=${email}`;

            const response = await axiosInstance.get(url);
            const data = await response.data;
            setUserList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setUserList([]);
        }
    }
    return (
        <>
            <div className="flex items-center justify-center w-800 text-skin-inverted">
                <div className="flex flex-col justify-center p-10 m-10">
                    <div className="w-800 mx-auto">
                        <input value={firstName} placeholder='First name' className='ml-4 rounded-lg text-center bg-skin-inverted'
                            onChange={e => setFirstName(e.target.value)} />
                        <input value={lastName} placeholder='Last name' className='ml-4 rounded-lg text-center bg-skin-inverted'
                            onChange={e => setLastName(e.target.value)} />
                        <input value={username} placeholder='Username' className='ml-4 rounded-lg text-center bg-skin-inverted'
                            onChange={e => setUsername(e.target.value)} />
                        <input value={email} placeholder='Email' className='ml-4 rounded-lg text-center bg-skin-inverted'
                            onChange={e => setEmail(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-skin-button hover:bg-skin-buttonselect text-skin-dark font-medium" onClick={() => searchUser()}>
                            SEARCH</button>
                    </div>
                    <div className="grid grid-cols-3 p-5">
                        {userList.map(user => <>
                            <li className=' relative group cursor-pointer font-martel-sans font-rubik bg-skin-inverted hover:bg-skin-select block text-center p-5 m-5'>
                                <Link to={`/profile/${user.username}`}>
                                    < p className='text-xl font-semibold'>{user.firstname} {user.lastname}</p>
                                    Username: {user.username} <br />
                                    Email: {user.email} <br />
                                </Link>
                            </li>
                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default User
