import React, { useState } from 'react';

export default function ItemCart({ data, isSelected, onCheckboxChange }) {
    const [quantity, setQuantity] = useState(1);
    const handleCheckboxChange = (e) => {
        onCheckboxChange(data.id);
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    const formatCurrency = (value) => {
        const formattedValue = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);

        return formattedValue;
    };
    return (
        <div>
            <div className="w-full h-30 border rounded flex">
                <input type="checkbox" className="mx-2 w-5" checked={isSelected} onChange={handleCheckboxChange} />
                <img
                    src="https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png"
                    className="h-32 object-cover rounded"
                    alt="iPhone 15"
                />
                <div className="p-2">
                    <div className="text-xl font-bold ">Điện thoại iPhone 11 (64GB) - Chính hãng VN/A</div>
                    <div className="text-lg text-red-500 font-semibold">{formatCurrency(data.price)}</div>
                    <div className="flex items-center mt-2">
                        <button
                            onClick={decreaseQuantity}
                            className="w-5 h-5 border rounded bg-gray-200 flex justify-center items-center"
                        >
                            <p className="font-bold flex justify-center items-center">-</p>
                        </button>
                        <span className="mx-2">{quantity}</span>
                        <button
                            onClick={increaseQuantity}
                            className="w-5 h-5 border rounded bg-gray-200 flex justify-center items-center"
                        >
                            <p className="font-bold flex justify-center items-center">+</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
