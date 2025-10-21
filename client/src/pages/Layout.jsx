import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SignIn, useUser } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';

const Layout = () => {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const { user } = useUser();

    if (!user) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <SignIn />
            </div>
        );
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <nav className='w-full px-8 h-16 flex items-center justify-between border-b border-gray-200 shrink-0'>
                <img src={assets.logo} alt="" className='cursor-pointer h-8' onClick={() => navigate('/')} />
                <div className='sm:hidden'>
                    {sidebar ?
                        <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600' />
                        :
                        <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600' />
                    }
                </div>
            </nav>
            <div className='flex-1 flex'>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                <div className='flex-1 bg-[#F4F7FB] p-4 sm:p-6 lg:p-8 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;