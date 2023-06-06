import React from 'react';
import Footer from './Footer.jsx';
import AppRoutes from './AppRoutes.jsx';
import Header from './Header.jsx';

export default function Page() {
    return (
        <div>

            <Header />
            <AppRoutes />
            <Footer />
        </div>
    );
}
