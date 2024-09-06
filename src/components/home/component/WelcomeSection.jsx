

const WelcomeSectionComponent = () => {
    return (
        <section className="flex flex-col h-screen items-center justify-center">
            <div className="mb-8 mt-16 md:mt-32">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
                    Water Level Monitoring
                </h2>
            </div>
            <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-purple-600 mb-6">
                    A Portal for Monitoring Water Levels Using IoT Technology
                </h3>
                <div className="max-w-4xl mx-auto mb-4 px-4">
                    <p className="text-base sm:text-lg text-gray-700">
                        This project is in the early stages as part of a collaborative research between Universitas Pendidikan Ganesha and KMUTT Geospatial Engineering and Innovation Center (KGEO).
                    </p>
                </div>
            </div>
            {/* <div className="flex items-center justify-center space-x-4"> */}
            <div className="flex flex-col md:flex-row md:gap-4 items-center justify-center w-full space-y-2 md:space-y-0">
                <a href="/map" className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 w-full max-w-xs text-center md:rounded-lg md:w-36">
                    Get Started
                </a>

                <a href="#" className="bg-white text-purple-600 py-3 px-6 rounded-full border border-purple-200 hover:bg-purple-200 transition duration-300 w-full max-w-xs text-center md:rounded-lg md:w-36">
                    User Guide
                </a>
            </div>
        </section>
    )
}

export default WelcomeSectionComponent
