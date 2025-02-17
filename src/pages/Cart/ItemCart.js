import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function ItemCart({ data, isSelected, onRemove, onCheckboxChange }) {
    const [quantity, setQuantity] = useState(data.quantity);
    console.log('iii', data);

    const handleCheckboxChange = (e) => {
        onCheckboxChange(data.id);
    };

    const increaseQuantity = () => {
        console.log(quantity);

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
            <div className="w-full h-36 border rounded flex">
                <div className="flex w-full  items-center">
                    <input
                        type="checkbox"
                        className="w-10 size-5"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                    />
                    <img
                        src={data.ProductDetail.Product.Images[0].url}
                        className="h-28 object-cover rounded"
                        alt={data.ProductDetail.Product.name}
                    />
                    <div className="p-10">
                        <div className="text-sm font-bold ">{data.ProductDetail.Product.name}</div>
                        <div className="text-sm">Size: {data.ProductDetail.Size.sizeName}</div>
                        <div className="text-lg text-red-500 font-semibold">
                            {formatCurrency(data.ProductDetail.selling_price)}
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
