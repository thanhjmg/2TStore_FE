import React, { useEffect, useState } from 'react';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder, getOrderCustomerById } from '../../services/orderService';
import Button from '../../components/Button';
import ModalConfirm from '../../components/ModalConfirm';
import ModalAlert from '../../components/ModalAlert';

export default function ModalOrder({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData?.accessToken || '';
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const [activeTab, setActiveTab] = useState('Chờ xác nhận');
    const [dataOrder, setDataOrder] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [isModalAlert, setIsModalAlert] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const handleClose = () => {
        setIsModal(false);
    };
    const handleCloseModal = () => {
        setIsModalAlert(false);
    };
    const formatCurrency = (value) => {
        return value?.toLocaleString('vi-VN');
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const getOrderCus = async () => {
        let status;
        if (activeTab === 'Chờ xác nhận') {
            status = 'Pending';
        } else if (activeTab === 'Đang giao') {
            status = 'Shipping';
        } else if (activeTab === 'Đã nhận hàng') {
            status = 'Completed';
        } else if (activeTab === 'Đã hủy') {
            status = 'Cancelled';
        }
        const customerId = userLoginData?.customerId;
        let orderByCustomer = await getOrderCustomerById(customerId, status, accessToken, axiosJWT);

        setDataOrder(orderByCustomer);
    };
    useEffect(() => {
        if (!isOpen) return; // Chỉ fetch nếu modal đang mở

        getOrderCus();
    }, [activeTab, isOpen]); // Thêm isOpen vào dependency

    const handleDeleteOrder = async (order) => {
        setOrderToDelete(order); // Lưu order để xóa
        setIsModal(true); // Hiển thị ModalConfirm
    };
    const handleConfirmDelete = async () => {
        if (!orderToDelete) return;

        try {
            const delOrder = await deleteOrder(orderToDelete.id, accessToken, axiosJWT);
            if (delOrder) {
                setIsModalAlert(true);
                getOrderCus(); // Load lại danh sách đơn hàng sau khi xóa
            } else {
                alert('Hủy thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }

        setIsModal(false);
        setOrderToDelete(null);
    };
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl  p-6 relative">
                <div className="flex justify-between border-b">
                    <div className="text-xl font-bold">Đơn hàng của bạn</div>
                    <button className="text-red-600 font-bold text-lg" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="w-full min-h-96">
                    <header className="p-4 shadow-md w-full ">
                        <nav className="container  flex w-full items-center">
                            <ul className="flex w-full justify-between">
                                {['Chờ xác nhận', 'Đang giao', 'Đã nhận hàng', 'Đã hủy '].map((tab) => (
                                    <li key={tab}>
                                        {' '}
                                        <div
                                            className={`text-black text-lg px-4 py-2  ${
                                                activeTab === tab ? ' border-b border-b-blue-600' : 'text-black'
                                            }`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>
                    <div className="mt-5">
                        <div className="w-full min-h-96 max-h-[500px] overflow-y-auto">
                            {dataOrder?.map((order, orderIndex) => (
                                <div className="border-2 mt-5">
                                    <div className="m-2 flex justify-between">
                                        <div>Ngày đặt hàng: {formatDate(order.createdAt)}</div>
                                        {order.status === 'Pending' ? (
                                            <Button
                                                className="
                                                     p-0 m-0 w-28 h-8 items-center 
                                                                        border rounded outline-none text-white
                                                                        bg-red-600 flex justify-center text-xs
                                                                    "
                                                onClick={() => handleDeleteOrder(order)}
                                            >
                                                Hủy đơn hàng
                                            </Button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    {order?.OrderDetails?.map((orderDetail, detailIndex) => (
                                        <div
                                            key={`${orderIndex}-${detailIndex}`}
                                            className="w-full flex justify-center items-center border-b p-4"
                                        >
                                            <div className="w-1/6 ml-2">
                                                <img
                                                    src={orderDetail?.Product?.Images?.[0]?.url}
                                                    className="w-20 h-20 object-cover"
                                                    alt={orderDetail?.Product?.name || 'Product Image'}
                                                />
                                            </div>
                                            <div className="w-4/6 ml-2 text-sm">
                                                <div className="font-bold">{orderDetail?.Product?.name}</div>
                                                <div className="flex gap-2 justify-between mt-2">
                                                    <p>
                                                        Size: <span>{orderDetail?.Size?.sizeName}</span>
                                                    </p>
                                                    <p>
                                                        SL: <span>{orderDetail?.quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-red-600 font-bold">
                                                {formatCurrency(orderDetail?.price)} <u>đ</u>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className=" flex justify-end">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={onClose}>
                        Đóng
                    </button>
                </div>
            </div>
            {isModal && (
                <ModalConfirm
                    title="Xác nhận"
                    alert="Bạn muốn hủy đơn hàng?"
                    textButton1="Thoát"
                    textButton2="Hủy"
                    isClose={handleClose}
                    handleConfirm={handleConfirmDelete}
                />
            )}
            {isModalAlert && <ModalAlert content="Đơn hàng đã được hủy thành công!" closeModal={handleCloseModal} />}
        </div>
    );
}
