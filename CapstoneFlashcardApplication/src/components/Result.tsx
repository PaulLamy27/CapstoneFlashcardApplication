// import React from 'react'
import './Result.css'

interface props {
    onClick: () => void
}

const Result = ({collectLists }) => {


   return (
    <ul>
      {collectLists.map(item => {
        return <h3>{item}</h3>;
      })}
    </ul>
  );
}

export default Result