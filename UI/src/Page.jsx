import React from 'react';
import Footer from './Footer.jsx';
import AppRoutes from './AppRoutes.jsx';

export default function Page() {
    return (
        <div className='scroll'>
            <AppRoutes />
            <Footer />
        </div>
    );
}
