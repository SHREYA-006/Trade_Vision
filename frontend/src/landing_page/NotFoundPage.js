import React from 'react';

function NotFoundPage() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <h1 className='mt-5 fs-3 mb-4'>Error 404</h1>
                <p className='muted-text mb-4'>Sorry,the page you are looking for does not exists</p>
            </div>
        </div>
    );
}

export default NotFoundPage;