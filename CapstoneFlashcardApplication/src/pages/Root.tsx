// root is what will be rendered on first load
//import './Root.css/'
import Navbar from "./Navbar"
import Hero from "./Hero"
import Dashboard from "./Dashboard"
import Compatibility from "./Compatibility"
import Footer from "./Footer"

const Root = () => {
    return (
        <>
            <div>
                <Hero />
                <Dashboard />
                <Compatibility />
                <Footer />
            </div>
        </>
    )
}

export default Root;