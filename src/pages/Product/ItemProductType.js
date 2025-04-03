import React from 'react';

export default function ItemProductType({ dataType, onClick, isSelected }) {
    console.log(dataType);
    const formatCurrency = (value) => {
        const formattedValue = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);

        // Trả về chuỗi đã định dạng
        return formattedValue;
    };

    return (
        <div
            className={`w-20 flex text-center justify-center items-center  h-10 border-2 rounded ${
                isSelected ? 'border-red-600' : ''
            }`}
            onClick={onClick}
        >
            <div className="">
                <div>
                    <div>{dataType.Size.sizeName}</div>
                    {/* <div className="font-semibold">{formatCurrency(5000000)}</div> */}
                </div>
            </div>
        </div>
    );
}
