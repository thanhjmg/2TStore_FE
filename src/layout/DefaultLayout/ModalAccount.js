import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getCustomerById } from '../../services/customerService';

function ModalAccount({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData?.accessToken || '';
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const getCustomerId = async () => {
            let customerById = await getCustomerById(userLoginData?.customerId, accessToken, axiosJWT);

            setFullName(customerById?.fullName);
            setEmail(customerById?.email);
            setAddress(customerById?.address);
            setPhone(customerById?.phone);
        };
        getCustomerId();
    }, [userLoginData, accessToken]);

    if (!isOpen) return null; // Ẩn modal nếu không mở

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold">Thông tin tài khoản</h2>
                    <button className="text-gray-500 hover:text-red-500 font-bold text-lg" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600">Email: {email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Tên người dùng:</p>
                        <input
                            type="text"
                            className="block p-2 pl-2  caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            defaultValue={fullName}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-gray-600">Số điện thoại:</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Địa chỉ:</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAccount;
