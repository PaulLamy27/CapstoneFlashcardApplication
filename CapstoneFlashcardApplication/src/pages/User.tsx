import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const User = () => {

    const [username, setUsername] = useState('');
    const [userList, setUserList] = useState([])

    const searchUser = async () => {
        try {
            // let url = `/api/user/search/${username}`;
            // if (firstName) url += `/${firstName}`;
            // if (lastName) url += `/${lastName}`;
            // if (username) url += `/${username}`;
            // if (email) url += `/${email}`;

            const response = await axiosInstance.get(`/api/user/search/${username}`);
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
                        <input value={username} placeholder='Username' className='ml-4 rounded-lg text-center bg-skin-inverted'
                            onChange={e => setUsername(e.target.value)} />
                        <button className="border rounded-lg m-5 p-2 bg-skin-button hover:bg-skin-buttonselect text-skin-dark font-medium" onClick={() => searchUser()}>
                            SEARCH</button>
                    </div>
                    <div className="grid grid-cols-3 p-5">
                        {userList.map((user, index) => (
                            <Link to={`/profile/${user.username}`}>
                                <li className='relative group cursor-pointer font-martel-sans font-rubik bg-skin-inverted hover:bg-skin-select block text-center p-7 m-5 w-32' key={index}>
                                    {user.username} 
                                </li>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default User
