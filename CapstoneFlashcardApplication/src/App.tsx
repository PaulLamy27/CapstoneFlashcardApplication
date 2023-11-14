// This page will use Routing.
// this means that the page will have 'links' to other components,
// and clicking those links will redirect you to that page, which is also a component.
// Therefore, import the following; these are the functions from react-router that will be used
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom"; // import the components we will use for this project.
import Root from "./pages/Root";
import Study from "./pages/Study";
import YourDecks from "./pages/YourDecks";
import Deck from "./pages/Deck";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Registration from "./pages/Registration";
import Navbar from "./pages/Navbar";



function App() {
  return (

    // createBrowserRouter(
    //   createRoutesFromElements(
    //     <Route path="/" element={<Root />}> 
    //       <Route path="deck" element={<Deck />}/>
    //       <Route path="your-decks" element={<YourDecks />}/>
    //     </Route>
    //   )
    // )

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/root" element={<Navigate to='/'/>} />
        <Route path="/home" element={<Navigate to='/'/>} />
        <Route path="/your-decks/*" element={<YourDecks />} />
        {/* <Route path="/deck" element={<Deck />} /> */}
        <Route path="/study" element={<Study />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>

        <Route path="/your-decks/:deckName" element={<Deck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
