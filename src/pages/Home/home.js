import React, { useEffect, useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import Menu from './../../components/Menu/Menu';
import { getAllProduct } from '../../services/productService';

function Home() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const [dataProduct, setDataProduct] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            let products = await getAllProduct();
            console.log('oopp', products);

            setDataProduct(products); // Kiểm tra xem có phải là mảng không
        };
        getProducts();
        console.log(dataProduct);
    }, []);

    return (
        <div className="container mx-auto px-4 mt-10">
            {dataProduct && dataProduct.length > 0 ? ( // Kiểm tra mảng có dữ liệu không
                <div className="flex flex-wrap -mx-2">
                    {dataProduct.map((item) => (
                        <div className="w-full md:w-1/6  px-2 mb-4" key={item.id}>
                            <ItemProduct data={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Không có sản phẩm nào.</p> // Thông báo khi không có sản phẩm
            )}
        </div>
    );
}

export default Home;
