import React, { useEffect, useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import Menu from './../../components/Menu/Menu';
import { getAllProduct, getProductByBrand, getProductByType } from '../../services/productService';
import { useParams } from 'react-router-dom';

function Product() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const [dataProduct, setDataProduct] = useState([]);
    const { brandName, typeName } = useParams();

    useEffect(() => {
        const getProducts = async () => {
            let products;
            if (brandName) {
                products = await getProductByBrand(brandName);
            } else if (typeName) {
                products = await getProductByType(typeName);
            } else {
                products = await getAllProduct();
            }

            setDataProduct(products); // Kiểm tra xem có phải là mảng không
        };
        getProducts();
        console.log(dataProduct);
    }, [brandName, typeName]);

    return (
        <div className="container mx-auto px-4 mt-10 w-full">
            <div className="w-full flex justify-end px-20 pb-5">
                Sắp xếp theo:
                <select name="selectedFruit" className="border-2 rounded">
                    <option value="apple">Mới nhất</option>
                    <option value="banana">Giá tăng dần</option>
                    <option value="orange">Giá giảm dần</option>
                </select>
            </div>
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

export default Product;
