import React from 'react';

function Pricing() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-4'>
                    <h1 className='fs-3'>Unbeatable Price</h1>
                    <p className='text-muted'>We pioneered the concept of discount broking and price transparency in India.Flat fees and no hidden charges</p>
                    <a href='' style={{textDecoration:"none"}}> See pricing <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className='col-2'></div>
                <div className='col-6'>
                    <div className='row text-center'>
                        <div className='col border p-3'>
                            <h1 className='mb-2'>₹0</h1>
                            <p>Free equity delivery and <br></br>direct mutual funds</p>
                        </div>
                        <div className='col border p-3'>
                            <h1 className='mb-2'>₹20</h1>
                            <p>Intrady and FAQs</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Pricing;