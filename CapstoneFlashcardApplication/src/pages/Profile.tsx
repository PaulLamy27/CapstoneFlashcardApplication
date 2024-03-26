import { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import YourDecks from './YourDecks';
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const ProfileSettingsModal = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentpassword] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [confirmNewPassword, setConfirmNewpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    setUserId(res.data.id)
                    setUsername(res.data.username)
                    console.log("User id ", res.data.id)
                }
                else {
                    setAuth(false)
                    setMessage(res.data.Error)
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            if (newPassword !== confirmNewPassword) {
                setErrorMessage("New password and confirmation don't match.");
                return;
            }

            const response = await axios.post('http://localhost:5000/api/user/change-password', {
                userId,
                currentPassword,
                newPassword,
            });

            console.log(response.data);
            setErrorMessage('Password changed successfully.');
        } catch (error) {
            // Handle error response
            console.error('Error changing password:', error);
            setErrorMessage(error.response.data.message || 'Failed to change password. Please try again.');
        }
    };

    const updateUsername = async (newUsername, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: newUsername,
                password: password
            });

            // Upon successful login with the new username, the backend should set a new token cookie
            console.log('Username updated successfully.');
            console.log(response.data);
            return true;
        } catch (error) {
            console.error('Error updating username:', error);
            return false;
        }
    };

    const handleChangeUsername = async (e) => {
        e.preventDefault();

        try {
            if (newUsername == username) {
                setErrorMessage("New username and current one match.");
                return;
            }

            const response = await axios.post('http://localhost:5000/api/user/change-username', {
                userId,
                newUsername,
            });
            console.log(response.data);
            onClose(); // Close the modal after successful update
        } catch (error) {
            // Handle error response
            console.error('Error changing username:', error);
            setErrorMessage(error.response.data.message || 'Failed to change username. Please try again.');
        }
        const success = await updateUsername(newUsername, currentPassword);
        if (success) {
            console.log('Username updated successfully. Refreshing page...');
            // Reload the page to ensure that the updated token cookie is retrieved
            navigate(`/profile/${newUsername}`, { replace: true });
            window.location.reload();
        } else {
            console.log('Failed to update username.');
        }
    };


    return isOpen && (
        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="relative bg-skin-bg border border-gray-600 rounded-lg w-96">
                    <div className="p-8">
                        <button
                            className="absolute top-4 right-4 text-gray-500"
                            onClick={onClose}
                        >
                            <IoMdClose size={30}></IoMdClose>
                        </button>
                        <h2 className="text-4xl font-bold text-center py-6 text-skin-header">
                            SETTINGS
                        </h2>
                        <form onSubmit={handleChangeUsername}>
                            <div className="flex flex-col py-2">
                                <label htmlFor="username">Change Username:</label>
                                <input className="border p-2 text-skin-inverted" type="username" placeholder="Enter New Username" name="newUsername" id="currentPassword" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                            </div>
                            <div className="flex flex-col py-2">
                                <label htmlFor="password">Current Password:</label>
                                <input className="border p-2 text-skin-inverted" type="password" placeholder="Enter Current Password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentpassword(e.target.value)} />
                            </div>
                            <button type="submit" className="border w-full my-5 py-2 bg-skin-button hover:bg-skin-bottonselect text-skin-dark font-medium">
                                Submit
                            </button>
                        </form>
                        <form onSubmit={handleChangePassword}>
                            <div className="flex flex-col py-2">
                                <label htmlFor="password">Current Password:</label>
                                <input className="border p-2 text-skin-inverted" type="password" placeholder="Enter Current Password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentpassword(e.target.value)} />
                            </div>
                            <div className="flex flex-col py-2">
                                <label htmlFor="password">New Password:</label>
                                <input className="border p-2 text-skin-inverted" type="password" placeholder="Enter New Password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewpassword(e.target.value)} />
                            </div>
                            <div className="flex flex-col py-2">
                                <label htmlFor="password">Confirm New Password:</label>
                                <input className="border p-2 text-skin-inverted" type="password" placeholder="Confirm New Password" name="confirmNewPassword" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewpassword(e.target.value)} />
                            </div>
                            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                            <button type="submit" className="border w-full my-5 py-2 bg-skin-button hover:bg-skin-bottonselect text-skin-dark font-medium">
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Profile = ({ handleThemeChange, currentTheme }) => {
    const [deckList, setDeckList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [auth, setAuth] = useState(false)
    const [username, setUsername] = useState('')
    const { username: profileUsername } = useParams();

    useEffect(() => {
        axios.get('http://localhost:5000')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    setUsername(res.data.username)
                    console.log("User id ", res.data.id)
                }
                else {
                    setAuth(false)
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/deck/user/publicdecks/${profileUsername}`, { withCredentials: true })
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

    }, [profileUsername]);


    return (
        <>
            <div className='text-skin-base max-w-[800px] w-full h-screen mx-auto'>
                <div className='text-skin-inverted py-2 w-10 right-0 top-0'>
                    <select id="themes" onChange={handleThemeChange} value={currentTheme}>
                        <option value="" selected>Default</option>
                        <option value="light">Light</option>
                    </select>
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-row'>
                        <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6 pr-4'>Hello,</h1>
                        <h1 className='md:text-3xl sm:text-6xl text-4xl font-bold md:py-6 text-skin-header'>{profileUsername}</h1>
                        {auth && username === profileUsername && (
                            <button className='text-skin-dark bg-skin-button hover:bg-skin-bottonselect mx-auto my-8 h-8 w-[130px] rounded-md font-medium' onClick={handleOpenModal}>Profile Settings</button>
                        )}
                        <ProfileSettingsModal isOpen={isModalOpen} onClose={handleCloseModal} />
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