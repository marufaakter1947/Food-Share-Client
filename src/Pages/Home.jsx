import React from 'react';
import Banner from '../Components/Banner';
import FeaturedFoods from '../Components/FeaturedFoods';
import HowWorks from '../Components/HowWorks';
import OurMission from '../Components/OurMission';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <HowWorks></HowWorks>
            <OurMission></OurMission>
        </div>
    );
};

export default Home;