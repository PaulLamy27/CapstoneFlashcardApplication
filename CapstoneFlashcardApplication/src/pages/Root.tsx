// root is what will be rendered on first load
import { Link, Outlet, BrowserRouter as Router } from "react-router-dom";
import "./Root.css/";
import "./Styles.css";

const Root = () => {
  return (
    <>
      <div className="navBar">
        <Link to="/" className="custom-link">
          Home
        </Link>
        <Link to="/deck" className="custom-link">
          Deck
        </Link>
        <Link to="/study" className="custom-link">
          Study
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
