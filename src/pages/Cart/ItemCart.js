import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function ItemCart({ data, isSelected, onRemove, onCheckboxChange, onQuantityChange }) {
    const [quantity, setQuantity] = useState(data.quantity);
    console.log('data:', data);

    const handleCheckboxChange = (e) => {
        onCheckboxChange(data.Product.ProductDetails[0], quantity);
    };
    useEffect(() => {
        onQuantityChange(data.id, quantity);
    }, [quantity]);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
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
            <div className="w-full h-36 border rounded flex">
                <div className="flex w-full  items-center">
                    <input
                        type="checkbox"
                        className="w-10 size-5"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                    />
                    <img
                        src={data.Product?.Images[0].url}
                        className="h-28 object-cover rounded"
                        alt={data.Product.name}
                    />
                    <div className="p-10">
                        <div className="text-sm font-bold ">{data.Product.name}</div>
                        <div className="text-sm">Size: {data.Size.sizeName}</div>
                        <div className="text-lg text-red-500 font-semibold">
                            {formatCurrency(data.Product.selling_price)}
                        </div>
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
                <button className=" mt-3 mr-3 h-10 text-gray-500 hover:text-red-500" onClick={() => onRemove(data.id)}>
                    <FaTrash size={20} className="" />
                </button>
            </div>
        </div>
    );
}
