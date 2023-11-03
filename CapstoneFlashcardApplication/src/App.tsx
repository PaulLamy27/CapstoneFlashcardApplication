// This page will use Routing.
// this means that the page will have 'links' to other components,
// and clicking those links will redirect you to that page, which is also a component.
// Therefore, import the following; these are the functions from react-router that will be used
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // import the components we will use for this project.
import './App.css';
import Root from "./pages/Root";
import Study from "./pages/Study";
import Deck from "./pages/Deck";
import YourDecks from "./pages/YourDecks";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Registration from "./pages/Registration";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Root />} />
        {/* <Route path="/your-decks" element={
          <Layout>
            <YourDecks />
            <Routes>
              <Route path="/deck" element={<Deck />} />
            </Routes>
          </Layout>
        }
        /> */}
        <Route path="/your-decks" element={<Layout>  <YourDecks /> </Layout>}>
        </Route>
        <Route
          path="/study"
          element={
            <Layout>
              <Study />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/registration"
          element={
            <Layout>
              <Registration />
            </Layout>
          }
        />
        <Route
          path="/your-decks/:deckId"
          element={
            <Layout>
              <Deck />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
