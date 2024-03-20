//import React from 'react'
import laptop from '../assets/CardMentor Deck Screen.png'

const Dashboard = () => {
  return (
    <div className='w-full bg-skin-inverted py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4' src={laptop} alt="/" />
            <div className='flex flex-col justify-center'>
                <p className='text-skin-header font-bold'>DECK MANAGEMENT DASHBOARD</p>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manage Flashcard Decks Centrally</h1>
                <p>With CardMentor, you can easily create and manage as many card decks as you please. Simply go to the deck page and create a deck. From there, you can add as many cards to it as you need and change what appears on either side of them.</p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
