import React from 'react'
import Card from './Card'
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
            <div className="resultContainer">
                <h1>Results</h1>
                <h2 className='right'>Correct: {rightArray.length}</h2>
                <h2 className='wrong'>Wrong: {wrongArray.length}</h2>
            </div>
        </>
    )
}

export default DisplayResults