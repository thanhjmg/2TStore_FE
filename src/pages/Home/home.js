import React, { useEffect, useState, useRef } from 'react';
import ItemProduct from '../Product/ItemProduct';
import Menu from './../../components/Menu/Menu';
import { getAllProduct, getProductLatest } from '../../services/productService';
import { Slide } from 'react-slideshow-image';
import { getImageByType } from '../../services/imageService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from '../../configRoutes/routes';

function Home() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const [dataProduct, setDataProduct] = useState([]);
    const [dataBanner, setDataBanner] = useState([]);
    const [productLatest, setProductLatest] = useState([]);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            const products = await getAllProduct();

            setDataProduct(products); // Kiểm tra xem có phải là mảng không
        };
        getProducts();
    }, []);

    useEffect(() => {
        const getProLatest = async () => {
            const proLatest = await getProductLatest();

            setProductLatest(proLatest); // Kiểm tra xem có phải là mảng không
        };
        getProLatest();
    }, []);

    useEffect(() => {
        const getImageBanner = async () => {
            const type = 'banner';
            let imgBanner = await getImageByType(type);

            setDataBanner(imgBanner); // Kiểm tra xem có phải là mảng không
        };
        getImageBanner();
    }, []);

    return (
        <div className="container mx-auto px-4 mt-5">
            <div className="slideshow-container w-full mx-auto -z-1 ">
                {dataBanner.length > 0 ? (
                    <Slide easing="ease" duration={3000} autoplay={true}>
                        {dataBanner.map((image, index) => (
                            <div className="w-full  flex justify-center mt-5">
                                <img src={image?.url} alt={`Slide ${index}`} className="w-full h-[500px] object-fill" />
                            </div>
                        ))}
                    </Slide>
                ) : (
                    <p>Không có banner hiển thị</p>
                )}
            </div>
            <div className="container mx-auto  mt-10 relative">
                <h2 className="text-2xl font-bold mb-4 flex justify-center">Sản phẩm mới nhất</h2>
                <div className="relative">
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={6}
                        spaceBetween={15}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {productLatest.map((item) => (
                            <SwiperSlide key={item.id}>
                                <ItemProduct data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Nút prev */}
                    <button
                        className="swiper-button-prev absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-black  p-2 rounded-full z-10"
                        onClick={() => swiperRef.current.swiper.slidePrev()}
                    >
                        ❮
                    </button>

                    {/* Nút next */}
                    <button
                        className="swiper-button-next absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-black  p-2 rounded-full z-10"
                        onClick={() => swiperRef.current.swiper.slideNext()}
                    >
                        ❯
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <h2 className="text-2xl font-bold mb-4 flex justify-center">Bạn đang tìm</h2>
                <div className="flex justify-between gap-5 mb-5">
                    <div onClick={() => navigate('/san-pham/giay-co-nhan-tao')}>
                        <img
                            src="https://theme.hstatic.net/1000061481/1001035882/14/index_banner_1.jpg?v=2160"
                            alt="giày cỏ nhân tạo"
                            className="h-4/5 w-full object-cover"
                        />
                        <h2 className="font-semibold">Giày cỏ nhân tạo (Đế TF)</h2>
                    </div>
                    <div onClick={() => navigate('/san-pham/giay-co-tu -nhien')}>
                        <img
                            src="https://theme.hstatic.net/1000061481/1001035882/14/index_banner_2.jpg?v=2160"
                            alt="giày cỏ tự nhiên"
                            className=" h-4/5 w-full object-cover"
                        />
                        <h2 className="font-semibold">Giày cỏ nhân tạo (Đế FG, AG, SG)</h2>
                    </div>
                    <div onClick={() => navigate('/san-pham/giay-futsal')}>
                        <img
                            src="https://theme.hstatic.net/1000061481/1001035882/14/index_banner_3.jpg?v=2160"
                            alt="giày futsal"
                            className=" h-4/5 w-full object-cover"
                        />
                        <h2 className="font-semibold">Giày Futsal (Đế IC)</h2>
                    </div>
                </div>
            </div>
            {/* {dataProduct && dataProduct.length > 0 ? ( // Kiểm tra mảng có dữ liệu không
                <div className="flex flex-wrap -mx-2 mt-5">
                    {dataProduct.map((item) => (
                        <div className="w-full md:w-1/6  px-2 mb-4" key={item.id}>
                            <ItemProduct data={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Không có sản phẩm nào.</p> // Thông báo khi không có sản phẩm
            )} */}
        </div>
    );
}

export default Home;
