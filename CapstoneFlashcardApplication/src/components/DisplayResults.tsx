import React from 'react'
import Card from './Card'
import { CardInfo } from './CardInfo';

interface Props {
    right: CardInfo[];
    wrong: CardInfo[];
}

const DisplayResults = (props: Props) => {
    const rightArray = props.right;
    const wrongArray = props.wrong;
    
    return (
        <>
            <h1>Results</h1>
            <h2>Correct: {rightArray.length}</h2>
            <h2>Wrong: {wrongArray.length}</h2>
        </>
    )
}

export default DisplayResults