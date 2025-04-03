import React, { useRef, useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ItemProductType from './ItemProductType';
import { FaCartArrowDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../services/productService';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCartByUserId, addProductToCart } from '../../services/cartService';
import config from '../../configRoutes';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import ImageZoom from './ImageZoom';

function ProductDetail() {
    const dispatch = useDispatch();
    const { name } = useParams();
    const [dataProduct, setDataProduct] = useState(null); // Bắt đầu từ null để phân biệt với array
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [productDetail, setProductDetail] = useState(null);
    const [carrId, setCartId] = useState(null);
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const navigate = useNavigate();
    const accessToken = userLoginData?.accessToken || '';
    const axiosJWT = getAxiosJWT(dispatch, userLoginData);

    useEffect(() => {
        const fetchCartData = async () => {
            const cart = await getCartByUserId(userLoginData?.customerId, accessToken, axiosJWT);
            setCartId(cart.id);
        };
        fetchCartData();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const product = await getProductBySlug(name);
                setDataProduct(product);
            } catch (error) {
                console.error('Error fetching product by slug:', error);
            } finally {
                setIsLoading(false); // Ngừng trạng thái loading
            }
        };
        getProducts();
    }, [name]);

    const slideRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageClick = (index) => {
        setCurrentIndex(index);
        slideRef.current.goTo(index);
    };

    const handleAddToCart = async (cartId, productDetail, quantity = 1) => {
        if (!userLoginData) {
            navigate(config.routeConfig.login); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        } else {
            if (!productDetail) {
                alert('Bạn chưa chọn Size cho sản phẩm!!');
            } else {
                try {
                    const productId = dataProduct.id;
                    const sizeId = productDetail.sizeId;
                    const response = await addProductToCart(quantity, productId, sizeId, cartId, accessToken, axiosJWT);

                    if (response) {
                        alert('Sản phẩm đã được thêm vào giỏ hàng!');
                    } else {
                        alert('Có lỗi xảy ra, vui lòng thử lại.');
                    }
                } catch (error) {
                    console.error('Thêm vào giỏ hàng thất bại:', error.message);
                    alert('Lỗi khi thêm vào giỏ hàng.');
                }
            }
        }
    };

    const handleItemClick = (item) => {
        setProductDetail(item);
    };
    const handleCheckout = () => {
        if (!productDetail) {
            alert('Bạn chưa chọn Size cho sản phẩm!!');
        } else {
            navigate(config.routeConfig.checkout, {
                state: {
                    selectedProduct: Array.isArray(productDetail)
                        ? productDetail
                        : [{ id: productDetail.id, quantity: 1 }],
                },
            });
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(value);
    };

    if (isLoading) return <div>Loading...</div>; // Hiển thị trạng thái tải
    if (!dataProduct) return <div>No product data available</div>; // Xử lý khi không có dữ liệu

    return (
        <div className="ml-5 mt-10">
            <div className="text-2xl font-bold">{dataProduct?.name}</div>
            <div className="w-full flex mt-10">
                <div className="w-full">
                    <div className="w-full flex">
                        <div className="w-5/12 pl-5">
                            <div className="slideshow-container max-w-3xl mx-auto -z-1">
                                <Slide ref={slideRef} easing="ease" duration={3000} autoplay={true}>
                                    {dataProduct.Images?.map((image, index) => (
                                        <div className="each-slide-z-1 w-full flex " key={index}>
                                            <ImageZoom src={image?.url} alt={`Slide ${index}`} />
                                        </div>
                                    ))}
                                </Slide>
                            </div>

                            <div className="thumbnail-container flex justify-center mt-5">
                                {dataProduct.Images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Thumbnail ${index}`}
                                        className={`w-20 h-20 object-cover mx-2 cursor-pointer transition-transform duration-200 group-hover:scale-150 ${
                                            currentIndex === index ? 'border-2 border-blue-500' : ''
                                        }`}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-5/12 ml-5">
                            <div className="flex">
                                <div className=" text-3xl text-red-600 mr-5">
                                    {formatCurrency(dataProduct.selling_price)}
                                </div>
                                <div className="flex items-end text-lg italic">
                                    {/* <del>{formatCurrency(dataProduct.ProductDetails[0].purchase_price)}</del> */}
                                    <div className="ml-5">| Bao gồm phí VAT</div>
                                </div>
                            </div>
                            <div className="mt-5 text-2xl font-semibold italic text-orange-600">
                                Cam kết sản phẩm chính hãng
                            </div>
                            <div className="mt-3 font-bold">Size</div>
                            <div className="flex flex-wrap ">
                                {dataProduct?.ProductDetails.map((item) => (
                                    <div className="mt-3 mr-5" key={item.id}>
                                        <ItemProductType
                                            dataType={item}
                                            onClick={() => handleItemClick(item)}
                                            isSelected={productDetail?.id === item.id}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="w-full flex justify-between mt-5">
                                    <button
                                        className="bg-red-500 w-full h-14 mr-2.5 justify-center text-white text-lg font-bold rounded hover:bg-red-700 flex items-center"
                                        onClick={handleCheckout}
                                    >
                                        Mua hàng
                                    </button>

                                    <button
                                        className="bg-orange-500 w-full h-14 ml-2.5 justify-center text-white text-lg font-bold rounded hover:bg-orange-700 flex items-center"
                                        onClick={() => handleAddToCart(carrId, productDetail)}
                                    >
                                        <FaCartArrowDown className="mr-2" size={30} />
                                        Thêm giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 mb-5 w-10/12 bg-white border rounded-lg">
                        <div className="text-red-600 font-bold flex justify-center m-5">Thông tin sản phẩm</div>
                        <div className="m-5">{dataProduct.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
