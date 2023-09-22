// import React from 'react'
import './Correct.css'

interface props {
    onClick: () => void
}

const Correct = ({ onClick }: props) => {
    return (
       
            <button className='correctButton' onClick={onClick}>Correct</button>
        
    )
}

export default Correct