import React, { useContext } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Navbar />
            <div className='drawer lg:drawer-open'>
                <input
                    id='dashboard-drawer'
                    type='checkbox'
                    className='drawer-toggle'
                />
                <div
                    className='drawer-content rounded-tl-lg'
                    style={{ background: '#F1F5F9' }}
                >
                    {/* Page content here */}
                    <Outlet />
                </div>
                <div className='drawer-side'>
                    <label
                        htmlFor='dashboard-drawer'
                        className='drawer-overlay'
                    ></label>
                    <ul className='menu p-4 w-80 h-full bg-white text-black'>
                        {/* Sidebar content here */}
                        <li className='mb-1'>
                            <Link to='/dashboard'>My Appointments</Link>
                        </li>
                        {isAdmin && (
                            <>
                                <li className='mb-1'>
                                    <Link to='/dashboard/allusers'>
                                        All Users
                                    </Link>
                                </li>
                                <li className='mb-1'>
                                    <Link to='/dashboard/adddoctor'>
                                        Add a Doctor
                                    </Link>
                                </li>
                                <li className='mb-1'>
                                    <Link to='/dashboard/managedoctors'>
                                        Manage Doctors
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
