// import React from 'react'
import './TryAgain.css'

interface props {
    onClick: () => void
}

const TryAgain = ({ onClick }: props) => {
    return (

        <button className='flex items-center justify-center text-skin-dark bg-skin-button h-10 w-[120px] rounded-md font-medium mx-auto border-b-gray-600 my-5'
            onClick={onClick}>
            Try again</button>

    )
}

export default TryAgain