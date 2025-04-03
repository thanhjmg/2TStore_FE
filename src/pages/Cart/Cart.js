import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemCart from './ItemCart';
import { useSelector, useDispatch } from 'react-redux';
import { getCartByUserId, deleteItemCart, updateQuantityItem } from '../../services/cartService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../configRoutes';

export default function Cart() {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const accessToken = userLoginData?.accessToken || '';
    const axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);
    const [dataCart, setDataCart] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    // Lấy giỏ hàng khi component được mount
    useEffect(() => {
        fetchCartData();
    }, []);
    const fetchCartData = async () => {
        const cart = await getCartByUserId(userLoginData?.customerId, accessToken, axiosJWT);
        setDataCart(cart);
    };

    const openDeleteModal = (cartItemId) => {
        setItemToRemove(cartItemId);
        setIsModalOpen(true);
    };

    // Đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
        setItemToRemove(null);
    };

    const handleRemoveItem = async () => {
        closeModal();
        if (!itemToRemove) return;

        const success = await deleteItemCart(itemToRemove, accessToken, axiosJWT);

        if (success) {
            alert('Xóa sản phẩm thành công!');
            fetchCartData(); // Cập nhật lại giỏ hàng
        } else {
            alert('Xóa sản phẩm thất bại, vui lòng thử lại.');
        }
        closeModal();
    };

    const onQuantityChange = (id, quantity) => {
        console.log('id:', id, quantity);

        clearTimeout(window.cartUpdateTimeout);
        window.cartUpdateTimeout = setTimeout(async () => {
            await updateQuantityItem(id, quantity, accessToken, axiosJWT);
        }, 500);
    };

    const handleCheckboxChange = (product, quantity) => {
        setSelectedItems((prevSelected) => {
            const isSelected = prevSelected.some((item) => item.id === product.id); // Kiểm tra ID có trong danh sách chưa

            if (isSelected) {
                return prevSelected.filter((item) => item.id !== product.id);
            } else {
                return [...prevSelected, { id: product.id, quantity }];
            }
        });
    };

    const handleCheckout = () => {
        if (!selectedItems) {
            alert('Bạn chưa chọn Size cho sản phẩm!!');
        } else {
            navigate(config.routeConfig.checkout, {
                state: {
                    selectedProduct: Array.isArray(selectedItems) ? selectedItems : [selectedItems],
                },
            });
        }
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-8/12 mt-5">
                <div className="flex text-lg items-center mb-4" onClick={() => navigate(config.routeConfig.home)}>
                    <FaArrowLeft />
                    <p className="ml-2">Giỏ hàng của bạn</p>
                </div>

                <div className="w-full flex justify-center items-center">
                    <div className="w-8/12 mt-5 pb-16">
                        {dataCart && dataCart.CartItems.length > 0 ? (
                            <div>
                                {dataCart.CartItems.map((item) => (
                                    <div className="mt-5" key={item.id}>
                                        <ItemCart
                                            data={item}
                                            onRemove={openDeleteModal}
                                            onCheckboxChange={handleCheckboxChange}
                                            onQuantityChange={onQuantityChange}
                                            isSelected={selectedItems.some(
                                                (selected) => selected.id === item.Product.ProductDetails[0].id,
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>Rỗng</div>
                        )}
                    </div>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-semibold">Xác nhận xóa</h2>
                            <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
                            <div className="flex justify-end mt-4">
                                <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={closeModal}>
                                    Hủy
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleRemoveItem}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="fixed bottom-0 w-8/12 flex justify-center">
                    <button
                        className="bg-red-500 w-8/12 h-14 text-white text-lg font-bold rounded hover:bg-red-700 flex items-center justify-center"
                        onClick={handleCheckout}
                    >
                        Thanh toán ngay
                    </button>
                </div>
            </div>
            {/* Nút Thanh toán */}
        </div>
    );
}
