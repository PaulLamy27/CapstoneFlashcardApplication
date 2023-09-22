
// import the components we will use for this project.
import Study from './pages/Study'
import Root from './pages/Root'
import Deck from './components/Deck'

import './App.css'
// This page will use Routing.
// this means that the page will have 'links' to other components,
// and clicking those links will redirect you to that page, which is also a component.
// Therefore, import the following; these are the functions from react-router that will be used
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

function App() {

  // router is what holds the routing to other pages/components
  const router = createBrowserRouter(
    // use createRoutesFromElements to make routes for the components
    createRoutesFromElements(
      // 'path' is what is added after the main URL,
      // element is what component will be loaded upon
      // either going to the path URL or you click on the Link 
      <Route path='/' element={<Root />}>
        <Route path='/deck' element={<Deck />} />
        <Route index path='/study' element={<Study />} />
      </Route>
    )
  )


  // use RouterProvider component and pass in the router instance we made.
  // this will render the router onto our App component.
  return (
    <>
      <div className="app">
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
