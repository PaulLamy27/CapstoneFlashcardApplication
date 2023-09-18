// import React from 'react'
import './DrawCard.css'

interface props {
    onClick: () => void
}

const Draw = ({ onClick }: props) => {
    return (
        <div className='buttonContainer'>
            <button className='button' onClick={onClick}>Draw Card</button>
        </div>
    )
}

export default Draw