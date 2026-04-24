import React from 'react';

function Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-lg-6 col-sm-12 p-5'>
                    <img src='images/largestBroker.svg' alt='largetBroker image'></img>
                </div>
                <div className='col-lg-6 col-sm-12 p-5'>
                    <h1 className='mb-1'>Larget Stock Broker in India</h1>
                    <p className='mb-5'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <ul>
                                <li className='mb-3'>Futures and options</li>
                                <li className='mb-3'>Commodity derivatives</li>
                                <li className='mb-3'>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <ul>
                                <li className='mb-3'>Stocks and IPOs</li>
                                <li className='mb-3'>Direct mutual funds</li>
                                <li className='mb-3'>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>
                    <img src='images/pressLogos.png' className='mt-5' style={{width:"90%"}}></img>
                </div>
            </div>
        </div>
    );
}

export default Awards;