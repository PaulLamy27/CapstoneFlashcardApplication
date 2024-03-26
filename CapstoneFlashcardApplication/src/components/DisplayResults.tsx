//import React from 'react'
//import Card from './Card'
import { CardInfo } from './CardInfo';

import './DisplayResults.css'

interface Props {
    right: CardInfo[];
    wrong: CardInfo[];
}

const DisplayResults = (props: Props) => {
    const rightArray = props.right;
    const wrongArray = props.wrong;

    return (
        <>
            <div className="resultContainer flex items-center justify-center w-full text-skin-base">
                <div className="flex flex-col items-center justify-center border border-skin-dark max-w-[400px] w-full mx-auto sm:mx-10 p-4">
                    <h2 className='text-4xl font-bold text-center py-6 text-skin-header'>Results</h2>
                    <div className="flex flex-col py-2">
                        <h2 className='text-green-600 font-bold'>Correct: {rightArray.length}</h2>
                    </div>
                    <div className="flex flex-col py-2">
                        <h2 className='text-red-600 font-bold'>Wrong: {wrongArray.length}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayResults
