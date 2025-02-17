import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { FaLaptop, FaMobileAlt, FaClock, FaHeadphones } from 'react-icons/fa';
import config from '../../configRoutes';
import { getProductType } from '../../services/productService';
import { getAllBrand } from '../../services/brandService';

const cx = classNames.bind();

function Menu({ onSelect }) {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(0);
    const [productType, setProductType] = useState();
    const [brand, setBrand] = useState([]);

    const fetchProductType = async () => {
        const productTypes = await getProductType();
        setProductType(
            productTypes?.map((proType) => ({
                ...proType,
                route: `/san-pham/${proType.slug}`, // Thêm route dựa vào id
            })),
        );
    };
    const fetchBrand = async () => {
        const brands = await getAllBrand();
        setBrand(
            brands?.map((br) => ({
                ...br,
                route: `/san-pham/brand/${br.slug}`, // Thêm route dựa vào id
            })),
        );
    };
    useEffect(() => {
        fetchProductType();
        fetchBrand();
    }, []);
    console.log('lll', productType);

    const menuItems = [
        {
            label: 'TRANG CHỦ',
            route: config.routeConfig.home,
            subItems: [],
        },
        {
            label: 'GIÀY ĐÁ BÓNG',

            subItems: productType ? productType : [],
        },
        {
            label: 'THƯƠNG HIỆU',
            route: config.routeConfig.home,
            subItems: brand ? brand : [],
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
        <nav className={cx('bg-red-900 h-14')}>
            <ul className={cx('flex w-full h-full items-center justify-center')}>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="w-full h-full flex justify-center mx-4 "
                        onMouseEnter={() => {
                            setSelectedItem(index);
                            setHoveredItem(index);
                        }}
                        onMouseLeave={() => {
                            setSelectedItem(null);
                            setHoveredItem(null);
                        }}
                    >
                        <div
                            className={cx(
                                'cursor-pointer text-lg font-bold  text-white flex items-center hover:text-yellow-600 ',
                                {
                                    'font-bold text-yellow-600': selectedItem === index || hoveredItem === index,
                                },
                            )}
                            onClick={() => handleItemClick(index, item.route)}
                        >
                            {item.label}
                        </div>

                        {item.subItems.length > 0 && hoveredItem === index && (
                            <ul className={cx('absolute ml-20 mt-14 w-48 bg-white shadow-md')}>
                                <li
                                    className="p-2 cursor-pointer hover:bg-yellow-600"
                                    onClick={() => navigate(config.routeConfig.product)}
                                >
                                    Tất cả sản phẩm
                                </li>
                                {item.subItems.map((subItem, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className="p-2 cursor-pointer hover:bg-yellow-600"
                                        onClick={() => navigate(subItem.route)}
                                    >
                                        {subItem.name}
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
