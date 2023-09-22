// import React from 'react'
import './Wrong.css'

interface props {
    onClick: () => void
}

const Wrong = ({ onClick }: props) => {
    return (
       
            <button className='wrongButton' onClick={onClick}>Wrong</button>
      
    )
}

export default Wrong