import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';

function ItemProduct({ data }) {
    const navigate = useNavigate();

    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN');
    };
    return (
        <div
            className="w-full h-72 bg-white border rounded-lg"
            onClick={() => {
                navigate(`/${data.slug}`);
            }}
        >
            <div className="h-full w-full p-3">
                <div className="h-5/6">
                    <div className="h-full">
                        <div className="h-5/6 flex justify-center">
                            <img src={data.Images[0].url} alt={data.productName} className="h-full object-cover" />
                        </div>
                        <div className="h-1/6">
                            <span className="text-center font-bold text-sm">{data.productName}</span>
                        </div>
                    </div>
                </div>
                <div className="h-1/6 flex">
                    <span className="text-center text-sm text-red-600">
                        {formatCurrency(data.ProductDetails[0].selling_price)} <u>đ</u>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
