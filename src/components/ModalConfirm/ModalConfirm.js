import React from 'react';

export default function ModalConfirm({ handleConfirm, closeModal, title, alert, textButton1, textButton2 }) {
    console.log(title);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p>{alert}</p>
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={closeModal}>
                        {textButton1}
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirm}>
                        {textButton2}
                    </button>
                </div>
            </div>
        </div>
    );
}
