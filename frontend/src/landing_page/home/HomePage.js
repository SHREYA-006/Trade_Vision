import React from 'react';
import Hero from './Hero';
import Pricing from './Pricing';
import Awards from './Awards';
import Education from './Education';
import Stats from './Stats';

import Footer from '../Footer';
import Navbar from '../Navbar';
import OpenAccount from '../OpenAccount';

function HomePage() {
    return ( 
        <>
            <Navbar></Navbar>
            <Hero></Hero>
            <Awards></Awards>
            <Stats></Stats>
            <Pricing></Pricing>
            <Education></Education>
            <OpenAccount></OpenAccount>
            <Footer></Footer>
        </> 
    );
}

export default HomePage;