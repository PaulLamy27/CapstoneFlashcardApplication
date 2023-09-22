// import React from 'react'
import './DrawCard.css'

interface props {
    onClick: () => void
}

const Draw = ({ onClick }: props) => {
    return (
            <button className='button' onClick={onClick}>Draw Card</button>
    )
}

export default Draw