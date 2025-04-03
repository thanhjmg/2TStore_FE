import React, { useEffect, useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import Menu from './../../components/Menu/Menu';
import { getAllProduct, getProductByBrand, getProductByType, searchProduct } from '../../services/productService';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';

function Product() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const [dataProduct, setDataProduct] = useState([]);
    const { brandName, typeName, search } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get('sort_by') || '';
    const searchKeyword = searchParams.get('search') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handleSortChange = (event) => {
        const params = { sort_by: event.target.value };

        if (searchKeyword) {
            params.search = searchKeyword; // Chỉ thêm `search` nếu có từ khóa
        }

        setSearchParams(params);
    };

    useEffect(() => {
        const getProducts = async () => {
            let products;
            if (searchKeyword) {
                products = await searchProduct(sortBy, searchKeyword);
            } else if (brandName) {
                products = await getProductByBrand(sortBy, currentPage, brandName);
            } else if (typeName) {
                products = await getProductByType(sortBy, currentPage, typeName);
            } else {
                products = await getAllProduct(sortBy, currentPage);
            }
            console.log(products);
            setDataProduct(products);
            setTotalPages(products?.totalPages); // Kiểm tra xem có phải là mảng không
        };
        getProducts();
    }, [brandName, typeName, sortBy, searchKeyword, currentPage]);

    return (
        <div className="container mx-auto px-4 mt-10 w-full">
            <div className="w-full flex justify-end px-20 pb-5">
                Sắp xếp theo:
                <select className="border-2 rounded" value={sortBy} onChange={handleSortChange}>
                    <option value="newest">Mới nhất</option>
                    <option value="price-ascending">Giá tăng dần</option>
                    <option value="price-descending">Giá giảm dần</option>
                </select>
            </div>
            {dataProduct.products && dataProduct.products.length > 0 ? ( // Kiểm tra mảng có dữ liệu không
                <div className="flex flex-wrap -mx-2">
                    {dataProduct.products.map((item) => (
                        <div className="w-full md:w-1/5  px-2 mb-4" key={item.id}>
                            <ItemProduct data={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Không có sản phẩm nào.</p> // Thông báo khi không có sản phẩm
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default Product;
