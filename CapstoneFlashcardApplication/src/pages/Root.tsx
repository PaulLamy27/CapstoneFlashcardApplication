
// root is what will be rendered on first load
import { Link, Outlet, BrowserRouter as Router } from "react-router-dom"
import './Root.css/'

const Root = () => {
    return (
        <>
            <div className="navBar">
                <Link to="/">
                    Home
                </Link>
                <Link to="/deck">
                    Deck
                </Link>
                <Link to="/study">
                    Study
                </Link>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Root;