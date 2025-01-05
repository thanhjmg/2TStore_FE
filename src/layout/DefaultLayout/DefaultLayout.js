import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../configRoutes';
import logo_t1 from './../../images/T1.png';
import { FaCartArrowDown } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import ModalAccount from './ModalAccount';

const cx = classNames.bind();

function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const searchRef = useRef();
    const [selectedMenu, setSelectedMenu] = useState('home');
    const handleMenuChange = (item) => setSelectedMenu(item);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalAccountOpen, setIsModalAccountOpen] = useState(false);
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cx('h-screen flex flex-col')}>
            <div className="fixed top-0 left-0 w-full z-20  bg-white shadow-md">
                <header className={cx('w-full flex flex-row justify-between items-center shadow-md ')}>
                    <nav className={cx('flex flex-row items-center justify-between w-full ml-5 mr-5')}>
                        <div className={cx('flex flex-row justify-between items-center cursor-pointer')}>
                            <img src={logo_t1} alt="avatar" className={cx('h-10 rounded md:h-20')} />
                            <h1 className="ml-2 font-medium text-xs sm:text-base md:text-2xl">2T Shop</h1>

                            <div
                                className={cx(
                                    'flex flex-row ml-3 justify-between pr-4 p-2 h-8  text-sm  md:w-96  border  placeholder:text-sv-placeholder placeholder:italic',
                                )}
                            >
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className={cx(' w-full outline-none placeholder-black')}
                                />
                                <BiSearch color="#000000" size={16} />
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <div
                                className="flex flex-row justify-center items-center hover:cursor-pointer"
                                onClick={() => navigate(config.routeConfig.gioHang)}
                            >
                                <FaCartArrowDown size={30} className="text-back" />
                                <p className="font-bold ml-2 text-xs md:text-sm">Giỏ hàng</p>
                            </div>
                            {userLoginData ? (
                                <div className="relative ml-10 mr-20 z-10 flex justify-center ">
                                    <div onClick={toggleDropdown} className="cursor-pointer font-bold text-blue-500">
                                        {userLoginData.username}
                                    </div>
                                    {isOpen && (
                                        <div className="absolute mt-10 w-48 bg-white border border-gray-200 rounded shadow-lg transition transform origin-top-right scale-95">
                                            <ul>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => setIsModalAccountOpen(true)}
                                                >
                                                    Thông tin tài khoản
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                    Đơn hàng của bạn
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                    Đăng xuất
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="relative ml-10 mr-20 z-10 flex justify-center text-sm text-blue-900 font-bold hover:cursor-pointer"
                                    onClick={() => navigate(config.routeConfig.login)}
                                >
                                    Đăng nhập
                                </div>
                            )}
                        </div>
                    </nav>
                </header>
                {location.pathname !== '/gio-hang' ? <Menu onSelect={handleMenuChange} /> : ''}
            </div>
            <div className={cx('flex flex-col w-full pt-28')}>
                <div className={cx('h-full flex')}>
                    <div className={cx('flex-1')}>{children}</div>
                </div>
            </div>
            {location.pathname !== '/gio-hang' ? (
                <div className="">
                    <Footer />
                </div>
            ) : (
                ''
            )}
            <ModalAccount isOpen={isModalAccountOpen} onClose={() => setIsModalAccountOpen(false)} />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
