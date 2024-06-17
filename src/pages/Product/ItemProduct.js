import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';

function ItemProduct({ data }) {
    const navigate = useNavigate();
    return (
        <div
            className="w-full h-96 bg-white border rounded-lg"
            onClick={() => {
                navigate(config.routeConfig.productDetail);
            }}
        >
            <div className="h-full w-full">
                <div className="h-5/6">
                    <div className="h-full">
                        <div className="h-4/6 flex justify-center">
                            <img src={data.image} alt={data.name} className="h-full object-cover" />
                        </div>
                        <div className="h-1/6 m-3">
                            <span className="text-center font-bold text-sm">{data.name}</span>
                        </div>
                    </div>
                </div>
                <div className="h-1/6 flex">
                    <span className="text-center text-xs">{data.name}</span>
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
