import React from 'react';

export default function ModalAlert({ closeModal, content }) {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-semibold">Thông báo</h2>
                    <p>{content}</p>
                    <div className="flex justify-end mt-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
