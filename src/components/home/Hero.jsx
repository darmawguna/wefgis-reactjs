// import BackgroundComponent from "./BackgroundComponent";

import BackgroundComponent from "./component/BackgroundSection";
import WelcomeSectionComponent from "./component/WelcomeSection";

const HeroComponent = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center">
                {/* Section untuk Welcome */}
                <WelcomeSectionComponent/>
                {/* Section untuk Background */}
                <BackgroundComponent />
                {/* Section untuk User Guide */}
                
            </div>
        </>
    );
};

export default HeroComponent;
