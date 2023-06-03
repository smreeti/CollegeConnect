import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import AppRoutes from './AppRoutes.jsx';

export default function Page() {
    return (
        <div>
         <Header />
               {/* <Navbar /> */}
            <AppRoutes />
            <Footer />
        </div>
    );
}
