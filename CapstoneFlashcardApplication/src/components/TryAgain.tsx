// import React from 'react'
import './TryAgain.css'

interface props {
    onClick: () => void
}

const TryAgain = ({ onClick }: props) => {
    return (
       
            <button className='TryAgainButton' onClick={onClick}>TryAgain</button>
        
    )
}

export default TryAgain