import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemCart from './ItemCart';

export default function Cart() {
    const dataProduct = [
        {
            id: 1,
            color: 'Màu Trắng',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
            price: '5000000',
        },
        {
            id: 2,
            color: 'Màu Vàng',
            image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png',
            price: '8000000',
        },
        {
            id: 3,
            color: 'Màu đỏ',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
            price: '9000000',
        },
        {
            id: 4,
            color: 'Bạch kim',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
            price: '3000000',
        },
    ];
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter((id) => id !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };
    console.log(selectedItems);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-8/12">
                <div className="flex text-lg items-center fixed  w-full z-10">
                    <FaArrowLeft />
                    <p className="ml-2">Giỏ hàng của bạn</p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-8/12 mt-5">
                        <div>
                            {dataProduct.map((item) => (
                                <div className="mt-5" key={item.id}>
                                    <ItemCart
                                        data={item}
                                        onCheckboxChange={handleCheckboxChange}
                                        isSelected={selectedItems.includes(item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="bg-red-500 w-full mt-10 h-14 mr-2.5 mb-5 justify-center text-white text-lg font-bold rounded hover:bg-red-700 flex items-center">
                            Thanh toán ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
