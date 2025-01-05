import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FaLaptop, FaMobileAlt, FaClock, FaHeadphones } from 'react-icons/fa';
import config from '../../configRoutes';

const cx = classNames.bind();

function Menu({ onSelect }) {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(0); // State cho item được chọn

    const menuItems = [
        {
            label: 'Trang chủ',
            route: config.routeConfig.home,
            subItems: [],
        },
        {
            label: 'Sản phẩm',

            subItems: [
                { label: 'iPhone 11', route: config.routeConfig.iphone11 },
                { label: 'iPhone 12', route: config.routeConfig.iphone12 },
                { label: 'iPhone 13', route: config.routeConfig.iphone13 },
                { label: 'iPhone 14', route: config.routeConfig.iphone14 },
            ],
        },
        {
            label: 'Khuyến mãi',
            route: config.routeConfig.home,
            subItems: [],
        },
        {
            label: 'Giới thiệu',
            route: config.routeConfig.home,
            subItems: [],
        },
        {
            label: 'Liên hệ',
            route: config.routeConfig.home,
            subItems: [],
        },
    ];

    const handleItemClick = (index, route, label) => {
        setSelectedItem(index);
        onSelect(label);
        navigate(route);
    };

    return (
        <nav className={cx('bg-red-900 shadow-md')}>
            <ul className={cx('flex flex-row p-1 justify-center')}>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="relative  flex w-full justify-center mx-4"
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <div
                            className={cx('cursor-pointer text-white', {
                                'font-bold border-b-2': selectedItem === index,
                            })}
                            onClick={() => handleItemClick(index, item.route)}
                        >
                            <div className="flex justify-center text-2xl">{item.icon}</div>
                            {item.label}
                        </div>

                        {item.subItems.length > 0 && hoveredItem === index && (
                            <ul className={cx('absolute mr-1 mt-10 w-48 bg-white shadow-md')}>
                                {item.subItems.map((subItem, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => navigate(subItem.route)}
                                    >
                                        {subItem.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Menu;
