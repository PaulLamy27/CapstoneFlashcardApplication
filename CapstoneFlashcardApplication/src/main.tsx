// the main TSX file that is the starting point of the application

import React from 'react'
import ReactDOM from 'react-dom/client'
// the main is going to use - in this case, LOAD - the App component
// therefore we must import it from whereeer in our file structure the .tsx 
// file itself lives
import App from './App.tsx'
import './index.css'


// React will interact with the DOM to render the App component into our HTML 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)