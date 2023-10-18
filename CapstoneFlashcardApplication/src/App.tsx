// This page will use Routing.
// this means that the page will have 'links' to other components,
// and clicking those links will redirect you to that page, which is also a component.
// Therefore, import the following; these are the functions from react-router that will be used
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // import the components we will use for this project.
import Root from "./pages/Root";
import Study from "./pages/Study";
import Deck from "./pages/Deck";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/deck"
          element={
            <Layout>
              <Deck />
            </Layout>
          }
        />
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
      </Routes>
    </Router>
  );
}

export default App;
