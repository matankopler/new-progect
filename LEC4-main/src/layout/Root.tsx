import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"


const Root = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex flex-col items-center justify-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Root