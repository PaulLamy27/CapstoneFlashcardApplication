import React from 'react'
import {
FaDribbbleSquare,
FaFacebookSquare,
FaGithubSquare,
FaInstagram,
FaTwitterSquare,
} from 'react-icons/fa'

const Footer = () => {
    const githubProfileUrl = 'https://github.com/PaulLamy27/CapstoneFlashcardApplication';
    const paulURL = 'https://github.com/PaulLamy27';
    const sirisaURL = 'https://github.com/Sisi-C';
    const brandonURL = 'https://github.com/Brandon-Martel';
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-center text-gray-300 py-16 px-4'>
        <div>
        <h1 className='text-3xl font-bold text-[#00df9a] m-4'>CARDMENTOR.</h1>
        <p className='py-4'>We greatly appreciate your interest in our app and would gladly accept feedback. Our GitHub repository and contact information is below.</p>
        <div className='flex justify-center items-center my-6'>
            <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
              <FaGithubSquare size={30} />
            </a>
        </div>
        </div>
        <div className='lg:col-span-3'>
            <div>
                <h6 className='font-medium text-gray-400'>Contact</h6>
                <ul>
                    <li className='py-2 text-sm'><a href={paulURL} target="_blank" rel="noopener noreferrer">Paul</a></li>
                    <li className='py-2 text-sm'><a href={sirisaURL} target="_blank" rel="noopener noreferrer">Sirisa</a></li>
                    <li className='py-2 text-sm'><a href={brandonURL} target="_blank" rel="noopener noreferrer">Brandon</a></li>
                </ul>
            </div>
        </div>

    </div>
  )
}

export default Footer