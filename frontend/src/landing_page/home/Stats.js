import React from 'react';
function Stats() {
    return (
        <div className='container'>
            <div className='row p-5'>
                <div className='col p-5 '>
                    <h1 className='fs-3 mb-5'>Trust with Confidence</h1>
                    <h3 className='fs-4'>Customer With Confidence</h3>
                    <p className='mb-4 text-muted'>That's why 1.3+ customers trust Zerodha with ₹3.5+ lakh crores worth of equity investments.</p>
                    
                    <h3 className='fs-4'>No spam or gimmicks</h3>
                    <p className='mb-4 text-muted'>No gimmicks, spam, "gamification", or annoying push notifications.High quality apps that you use at your pace, the way you like.</p>
                    
                    <h3 className='fs-4'>The Zerodha Universe</h3>
                    <p className='mb-4 text-muted'>Not just an app, but an whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    
                    <h3 className='fs-4'>Do better with money</h3>
                    <p className='mb-4 text-muted'>With initiatives like Nudge and Kill switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
                </div>
                <div className='col p-5 mr-5'>
                    <img src='images/ecosystem.png' style={{width:"90%"}} ></img>
                    <div className='text-center'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products <i class="fa-solid fa-arrow-right"></i></a>
                        <a href='' style={{textDecoration:"none"}}>Try Kite demo <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Stats;