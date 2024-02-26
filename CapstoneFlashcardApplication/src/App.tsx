// This page will use Routing.
// this means that the page will have 'links' to other components,
// and clicking those links will redirect you to that page, which is also a component.
// Therefore, import the following; these are the functions from react-router that will be used
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // import the components we will use for this project.
import Root from "./pages/Root";
import Study from "./pages/Study";
import Deck from "./pages/Deck";
import YourDecks from "./pages/YourDecks";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Navbar from "./pages/Navbar";
import ChooseDeck from "./pages/ChooseDeck";
import Profile from "./pages/Profile";
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/root" element={<Navigate to='/'/>} />
        <Route path="/home" element={<Navigate to='/'/>} />
        <Route path="/your-decks/*" element={<YourDecks />} />
        <Route path="/study" element={<ChooseDeck />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/user" element={<User />}/>
        <Route path="/your-decks/:deckName" element={<Deck />} />
        <Route path="/study/:deckName" element={<Study />} />
        <Route path="/profile/:username" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
