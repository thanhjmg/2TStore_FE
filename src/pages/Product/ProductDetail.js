import React, { useRef, useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ItemProductType from './ItemProductType';
import { FaCartArrowDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../services/productService';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../configRoutes';

function ProductDetail() {
    const { name } = useParams();
    const [dataProduct, setDataProduct] = useState(null); // Bắt đầu từ null để phân biệt với array
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const product = await getProductBySlug(name);
                setDataProduct(product);
                console.log('lll:', product);
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
    const [selectedItem, setSelectedItem] = useState(null);

    const handleImageClick = (index) => {
        setCurrentIndex(index);
        slideRef.current.goTo(index);
    };

    const handleAddToCart = (dataProduct, selectedItem) => {
        if (!userLoginData) {
            navigate(config.routeConfig.login);
        } else {
            if (!selectedItem) {
                alert('Bạn chưa chọn Size cho sản phẩm!!');
            } else {
                console.log('User:', userLoginData);
            }
        }
        console.log('111:', selectedItem);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item.id);
        console.log('Selected item:', item);
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
            <div className="text-2xl font-bold">{dataProduct?.productName}</div>
            <div className="w-full flex mt-10">
                <div className="w-8/12">
                    <div className="w-full flex">
                        <div className="w-5/12">
                            <div className="slideshow-container max-w-2xl mx-auto pl-5 pr-5 -z-1">
                                <Slide ref={slideRef} easing="ease" duration={3000} indicators autoplay={true}>
                                    {dataProduct.Images?.map((image, index) => (
                                        <div className="each-slide -z-1" key={index}>
                                            <img
                                                src={image?.url}
                                                alt={`Slide ${index}`}
                                                className="w-full max-h-96 object-contain z-0"
                                            />
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
                                        className={`w-20 h-20 object-cover mx-2 cursor-pointer ${
                                            currentIndex === index ? 'border-2 border-blue-500' : ''
                                        }`}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-7/12 ml-5">
                            <div className="flex">
                                <div className="font-bold text-3xl text-red-600 mr-5">
                                    {formatCurrency(dataProduct.ProductDetails[0].selling_price)}
                                </div>
                                <div className="flex items-end text-lg italic">
                                    {/* <del>{formatCurrency(dataProduct.ProductDetails[0].purchase_price)}</del> */}
                                    <div className="ml-5">| Bao gồm phí VAT</div>
                                </div>
                            </div>
                            <div className="mt-3 font-bold">Size</div>
                            <div className="flex flex-wrap ">
                                {dataProduct?.ProductDetails.map((item) => (
                                    <div className="mt-3 mr-5" key={item.id}>
                                        <ItemProductType
                                            dataType={item}
                                            onClick={() => handleItemClick(item)}
                                            isSelected={selectedItem === item.id}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="w-full flex justify-between mt-5">
                                    <button className="bg-red-500 w-full h-14 mr-2.5 justify-center text-white text-lg font-bold rounded hover:bg-red-700 flex items-center">
                                        Mua hàng
                                    </button>

                                    <button
                                        className="bg-orange-500 w-full h-14 ml-2.5 justify-center text-white text-lg font-bold rounded hover:bg-orange-700 flex items-center"
                                        onClick={() => handleAddToCart(dataProduct, selectedItem)}
                                    >
                                        <FaCartArrowDown className="mr-2" size={30} />
                                        Thêm giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 mb-5 w-full bg-white border rounded-lg">
                        <div className="text-red-600 font-bold flex justify-center m-5">Thông tin sản phẩm</div>
                        <div className="m-5">{dataProduct.description}</div>
                    </div>
                </div>
                <div className="w-4/12 m-5 mt-0">
                    <div className="w-full bg-white border rounded-lg">
                        <div className="text-red-600 font-bold text-lg flex justify-center m-5">Thông tin sản phẩm</div>
                        <div className="m-5">
                            <ul>
                                <li className="flex justify-between py-2 border-b">
                                    <span className="">{dataProduct.description}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
