import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
import logo_t1 from './../../images/T1.png';
import { FaCartArrowDown } from 'react-icons/fa';

import { BiSearch } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';

const cx = classNames.bind();

function DefaultLayout({ children }) {
    const navigate = useNavigate();

    const searchRef = useRef();
    const [selectedMenu, setSelectedMenu] = useState('home');
    const handleMenuChange = (item) => {
        setSelectedMenu(item);
    };

    return (
        <div className={cx('h-screen flex  w-full')}>
            <div className="w-1/12"></div>
            <div className="w-10/12">
                <div className={cx('h-14  flex flex-row ')}>
                    <div className={cx('flex w-full justify-self-start items-center')}>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                navigate(config.routeConfig.home);
                            }}
                        >
                            <img src={logo_t1} alt="avatar" className={cx('w-36 h-12 rounded')} />
                        </div>
                        <div
                            className={cx(
                                ' flex flex-row ml-10 justify-between pr-4 p-2 pl-4 h-8 caret-sv-blue-4 text-sm w-96 rounded-sv-login-input  border border-sv-blue-4  placeholder:text-sv-placeholder placeholder:italic',
                            )}
                        >
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Tìm kiếm..."
                                className={cx(' w-full outline-none')}
                            />
                            <BiSearch color="#C7C7C7" size={16} />
                        </div>
                    </div>
                    <div className={cx('flex flex-row w-2/12 justify-between items-center')}>
                        <div className="flex flex-row justify-center items-center hover:cursor-pointer">
                            <div className="flex flex-row ">
                                <FaCartArrowDown size={30} className="text-green-900" />
                            </div>
                            <div className="flex flex-row ml-3 justify-center items-center">
                                <p className="font-bold mr-2">Giỏ hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('flex flex-col w-full')}>
                    <Menu onSelect={handleMenuChange} />
                    <div className={cx('h-full flex')}>
                        <div className={cx('flex-1')}>{children}</div>
                    </div>
                </div>
            </div>
            <div className="w-1/12"></div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
