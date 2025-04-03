import React from 'react';

export default function ItemProduct({ data }) {
    const formatCurrency = (value) => {
        return value?.toLocaleString('vi-VN');
    };
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-1/6 ml-2">
                <img src={data.Product?.Images[0].url} className="w-20 h-20 object-cover" />
            </div>
            <div className="w-4/6 ml-2 text-sm">
                <div>{data.Product?.name}</div>
                <div className="flex gap-2 justify-between mt-2">
                    <p>
                        Size: <span>{data.Size?.sizeName}</span>
                    </p>

                    <p>
                        SL: <span>{data.quantityBuy}</span>
                    </p>
                </div>
            </div>
            <div className="text-red-600">
                {formatCurrency(data.Product?.selling_price)} <u>đ</u>
            </div>
        </div>
    );
}
