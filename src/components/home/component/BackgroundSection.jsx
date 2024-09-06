const BackgroundComponent = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center py-16 ">

            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">

                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/water_level_monitoringpng-removebg-preview.png"
                        alt="Monitoring Water Level"
                        className="w-3/4 md:w-96 h-auto"
                    />
                </div>

                <div className="md:w-1/2 space-y-6 text-left px-4 md:px-0">
                    <div className="p-4">
                        <div className="flex items-center justify-center">
                            <h2 className="text-lg md:text-2xl font-semibold text-purple-600 uppercase mb-12">
                                Background
                            </h2>
                        </div>

                        <p className="text-sm md:text-base text-gray-600">
                            Flooding is a devastating disaster that often strikes without warning, causing billions in damage and countless loss of life each year. <br />
                            The absence of effective monitoring systems makes early detection crucial to minimizing harm. By leveraging IoT technology, real-time water level sensors provide immediate data to central servers, enabling faster, more precise responses in flood-prone areas. This technology not only saves lives through early warnings but also helps governments better manage water resources and prevent disasters. <br />
                            Our goal is to enhance community safety by developing a reliable flood monitoring system, empowering communities to be better prepared through advanced, accessible technology.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BackgroundComponent;
