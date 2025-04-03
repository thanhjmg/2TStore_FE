import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from '../../configRoutes/routes';
import config from '../../configRoutes';
import Button from '../../components/Button';
import { getCartByUserId, addProductToCart } from '../../services/cartService';
import { getProductDetailById } from '../../services/productService';
import { getCustomerById, updateCustomerById } from '../../services/customerService';
import { addOrder, deleteOrder } from '../../services/orderService';
import ItemProduct from './ItemProduct';
import ModalAlert from '../../components/ModalAlert';
import { set, useForm } from 'react-hook-form';
import { checkOutMomo, checkPayment } from '../../services/checkOutService';

export default function CheckOut() {
    const dispatch = useDispatch();
    const location = useLocation();

    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const accessToken = userLoginData?.accessToken || '';
    const axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const navigate = useNavigate();
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('Cod');
    const { selectedProduct } = location.state || {};
    const { quantity } = location.state || {};
    const [productBuy, setProductBuy] = useState([]);
    const [customer, setCustomer] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAlert, setIsModalAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getProvinces = async () => {
            try {
                let response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
                let dataProvinces = await response.json(); // Lấy dữ liệu JSON
                setProvinces(dataProvinces.data); // Lưu vào state
                // Log kiểm tra dữ liệu
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu tỉnh/thành:', error);
            }
        };
        getProvinces();
    }, []);
    const fetchCustomer = async () => {
        try {
            const cus = await getCustomerById(userLoginData?.customerId, accessToken, axiosJWT);
            reset(cus);
            if (cus) {
                const parsedAddress = parseAddress(cus.address);

                // Tìm ID tỉnh
                const provinceMatch = provinces.find((p) => p.name === parsedAddress.province);
                setSelectedProvince(provinceMatch ? provinceMatch : '');
                setValue('province', parsedAddress.province);
                setValue('district', parsedAddress.district);
                setValue('ward', parsedAddress.ward);

                if (provinceMatch) {
                    await getDistricts(provinceMatch.id); // Gọi API lấy huyện
                }
                setAddressDetail(parsedAddress.detail);
                setValue('addressDetail', parsedAddress.detail);
                setCustomer(cus);
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
        }
    };

    useEffect(() => {
        if (provinces.length > 0) {
            fetchCustomer();
        }
    }, [provinces]);

    const getDistricts = async (provinceId) => {
        try {
            let response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
            let dataDistrict = await response.json(); // Lấy dữ liệu JSON
            setDistricts(dataDistrict.data); // Lưu vào state
        } catch (error) {}
    };

    const getWards = async (districtId) => {
        try {
            let response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            let dataWard = await response.json(); // Lấy dữ liệu JSON
            setWards(dataWard.data); // Lưu vào state
            // Log kiểm tra dữ liệu
        } catch (error) {}
    };

    const parseAddress = (fullAddress) => {
        if (!fullAddress) return { detail: '', ward: '', district: '', province: '' };

        const parts = fullAddress.split(',').map((p) => p.trim());
        const length = parts.length;

        return {
            detail: length > 3 ? parts.slice(0, length - 3).join(', ') : '',
            ward: length > 2 ? parts[length - 3] : '', // Xã/Phường
            district: length > 1 ? parts[length - 2] : '', // Huyện/Quận
            province: length > 0 ? parts[length - 1] : '', // Tỉnh/Thành phố
        };
    };

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        const province = provinces.find((p) => p.id === provinceId);
        setSelectedDistrict(''); // Reset huyện
        setSelectedWard('');
        setWards([]); // Reset xã
        getDistricts(provinceId);
        setValue('province', province?.name || '');
        setValue('district', '');
        setValue('ward', '');
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        const district = districts.find((d) => d.id === districtId);
        setSelectedWard('');
        setWards([]); // Reset danh sách xã
        getWards(districtId);
        setValue('district', district?.name || '');
        setValue('ward', '');
    };

    const handleWardChange = (e) => {
        const wardId = e.target.value;
        setSelectedWard(wardId);
        const ward = wards.find((w) => w.id === wardId);

        setValue('ward', ward?.name || '');
    };
    useEffect(() => {
        if (wards.length > 0 && customer) {
            const parsedAddress = parseAddress(customer.address);
            const wardMatch = wards.find((w) => w.name === parsedAddress.ward);
            setSelectedWard(wardMatch ? wardMatch : '');
        }
    }, [wards]);

    useEffect(() => {
        const fetchWards = async () => {
            if (districts.length > 0 && customer) {
                const parsedAddress = parseAddress(customer.address);
                const districtMatch = districts.find((d) => d.name === parsedAddress.district);
                setSelectedDistrict(districtMatch ? districtMatch : '');

                if (districtMatch) {
                    await getWards(districtMatch.id); // Gọi API lấy danh sách xã
                }
            }
        };
        fetchWards();
    }, [districts, customer]);

    const handleClose = () => {
        setIsModalAlert(false);
    };

    const handleCheckPayment = async (orderId, id) => {
        const interval = setInterval(async () => {
            const status = await checkPayment(orderId);

            console.log('status:', id);

            if (
                status.resultCode === 0 ||
                status.resultCode === 9001 ||
                status.resultCode === 7000 ||
                status.resultCode === 1006
            ) {
                clearInterval(interval); // Dừng kiểm tra khi có kết quả
                if (status.resultCode === 0) {
                    setIsModalOpen(true); // Hiển thị thông báo thành công
                } else {
                    try {
                        const delOrder = await deleteOrder(id, accessToken, axiosJWT);
                        if (delOrder) {
                            return true; // Load lại danh sách đơn hàng sau khi xóa
                        } else {
                            return false;
                        }
                    } catch (error) {
                        console.error('Lỗi khi xóa đơn hàng:', error);
                        alert('Đã xảy ra lỗi, vui lòng thử lại!');
                    }
                }
            }
        }, 5000); // Kiểm tra mỗi 5 giây
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate(config.routeConfig.product);
    };

    const handleSubmitOrder = async () => {
        const items = productBuy;
        const customerId = userLoginData?.customerId;
        const total_price = totalPrice;
        const shippingAddress = `${addressDetail}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;

        const status = 'Pending';
        const statusPayment = 'Unpaid';
        let order;
        try {
            order = await addOrder(
                customerId,
                total_price,
                paymentMethod,
                shippingAddress,
                status,
                statusPayment,
                items,
                accessToken,
                axiosJWT,
            );

            if (paymentMethod === 'Online') {
                var id = order.data.id;
                var orderId = `ORDER_${order.data.id}`;

                const momo = await checkOutMomo(totalPrice, orderId);
                if (momo?.payUrl) {
                    window.open(momo.payUrl, '_blank');
                    handleCheckPayment(orderId, id);
                    // setIsModalOpen(true);
                }
            }

            if (order && paymentMethod === 'Cod') {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Lỗi khi đặt đơn hàng:', error);
        }
    };

    useEffect(() => {
        const getProDetailId = async () => {
            try {
                if (selectedProduct.length === 0) return;

                // Xóa danh sách cũ trước khi thêm mới
                setProductBuy([]);
                setTotalPrice(0);

                // Tạo danh sách promise để lấy thông tin sản phẩm
                const productPromises = selectedProduct.map(async (select) => {
                    let product;
                    if (select.Product) {
                        product = await getProductDetailById(select.productDetailId, accessToken, axiosJWT);
                    } else {
                        product = await getProductDetailById(select.id, accessToken, axiosJWT);
                    }

                    return { ...product, quantityBuy: select.quantity }; // Thêm số lượng vào sản phẩm
                });

                // Chờ tất cả dữ liệu từ API
                const products = await Promise.all(productPromises);

                // Cập nhật danh sách sản phẩm
                setProductBuy(products);

                // Tính tổng tiền
                const total = products.reduce(
                    (sum, product) => sum + product.Product.selling_price * product.quantityBuy,
                    0,
                );
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching product by Id:', error);
            }
        };

        getProDetailId();
    }, [selectedProduct]);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

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

    useEffect(() => {
        const fetchWards = async () => {
            if (districts.length > 0 && customer) {
                const parsedAddress = parseAddress(customer.address);
                const districtMatch = districts.find((d) => d.name === parsedAddress.district);
                setSelectedDistrict(districtMatch ? districtMatch : '');

                if (districtMatch) {
                    await getWards(districtMatch.id); // Gọi API lấy danh sách xã
                }
            }
        };
        fetchWards();
    }, [districts, customer]);

    const onSubmit = async (data) => {
        console.log('data:', data);
        const id = data.id;
        const fullName = data.fullName;
        const phone = data.phone;
        const address = `${data.addressDetail}, ${data.ward}, ${data.district}, ${data.province}`;
        const update = await updateCustomerById(id, fullName, phone, address, accessToken, axiosJWT);
        if (update) {
            setAlert('Cập nhật thành công');
            setIsModalAlert(true);
        } else {
            setAlert('Cập nhật thất bại');
            setIsModalAlert(true);
        }
    };

    return (
        <div className="w-full flex mt-10">
            <div className="w-7/12 bg-white flex justify-end border-r-2">
                <div className="p-5 flex flex-col gap-2.5 w-8/12">
                    <div className="font-semibold text-2xl">Thông tin giao hàng</div>
                    <div className="flex">
                        <p>
                            Bạn đã có tài khoản? <p></p>
                        </p>
                        <div
                            onClick={() => {
                                navigate(config.routeConfig.login);
                            }}
                            className="text-blue-500 cursor-pointer"
                        >
                            Đăng nhập
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="w-full flex justify-between gap-5"></div>

                        <div className="w-full flex justify-between gap-5">
                            <div className="w-1/2">
                                <label>Email</label>
                                <input
                                    readOnly
                                    {...register('email', { required: 'Tên sản phẩm là bắt buộc' })}
                                    className="w-full border p-2 rounded mt-1 opacity-50"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between gap-5">
                            <div className="w-1/2">
                                <label>Họ và tên:</label>
                                <input
                                    {...register('fullName', { required: 'Tên sản phẩm là bắt buộc' })}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            </div>
                            <div className="w-1/2">
                                <label>Số điện thoại</label>
                                <input
                                    {...register('phone', { required: 'Tên sản phẩm là bắt buộc' })}
                                    className="w-full border p-2 rounded mt-1"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Địa chỉ</label>
                            <input
                                {...register('addressDetail', { required: 'Tên sản phẩm là bắt buộc' })}
                                className="w-full border p-2 rounded mt-1"
                            />
                        </div>
                        <div className=" w-full flex justify-between gap-5">
                            <div className="w-1/3">
                                <select
                                    className="border rounded px-3 py-2 w-full"
                                    value={selectedProvince?.id}
                                    onChange={handleProvinceChange}
                                >
                                    <option value="">Chọn tỉnh</option>
                                    {provinces.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/3">
                                <select
                                    className="border rounded px-3 py-2 w-full"
                                    value={selectedDistrict?.id}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Chọn huyện</option>
                                    {districts.map((dis) => (
                                        <option key={dis.id} value={dis.id}>
                                            {dis.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-1/3">
                                <select
                                    className="border rounded px-3 py-2 w-full"
                                    value={selectedWard?.id}
                                    onChange={handleWardChange}
                                >
                                    <option value="">Chọn xã</option>
                                    {wards.map((w) => (
                                        <option key={w.id} value={w.id}>
                                            {w.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <input
                            type="submit"
                            value="Cập nhật thông tin"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        />
                    </form>
                    <div className="font-semibold text-2xl">Phương thức thanh toán</div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                value="Cod"
                                checked={paymentMethod === 'Cod'}
                                name="checkout"
                                onChange={handlePaymentChange}
                                className="scale-150"
                            />
                            <div className="flex w-full ml-5 items-center gap-2">
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6" />
                                <label>Thanh toán khi nhận hàng</label>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                value="Online"
                                name="checkout"
                                onChange={handlePaymentChange}
                                className="scale-150"
                            />
                            <div className="w-full flex items-center gap-2 ml-5">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                    width={40}
                                    height={40}
                                />
                                <label>Thanh toán qua Momo</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center p-5">
                        <Button
                            className="w-3/4 bg-red-600 border h-10 flex items-center justify-center rounded text-white"
                            onClick={handleSubmitOrder}
                        >
                            Hoàn tất đơn hàng
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-5/12">
                <div className="w-full border-b-2">
                    {productBuy?.map((product, index) => (
                        <ItemProduct data={product} />
                    ))}
                </div>
                <div className="w-full border-b-2">
                    <div className="flex  gap-5 m-5">
                        <p className="w-1/6">Tạm tính:</p>
                        <div>170000000</div>
                    </div>
                    <div className="flex gap-5 m-5">
                        <p className="w-1/6">Phí vận chuyển:</p>
                        <div>170000000</div>
                    </div>
                </div>
                <div className="w-full ">
                    <div className="flex  gap-5 m-5">
                        <p className="w-1/6 font-bold">Tổng tiền:</p>
                        <div className="font-bold text-red-600">{formatCurrency(totalPrice)}</div>
                    </div>
                </div>
            </div>
            {isModalOpen && <ModalAlert content="Bạn đã đặt hành thành công!!" closeModal={handleCloseModal} />}
            {isModalAlert && <ModalAlert content={alert} closeModal={handleClose} />}
        </div>
    );
}
