import HeaderComponent from "../../components/home/Header"
import HeroComponent from "../../components/home/Hero"


const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
            <HeaderComponent />
            <HeroComponent />
        </div>
    )
}

export default HomePage
