import * as httpRequest from '../utils/httpRequest';

export const getAllProduct = async () => {
    try {
        // Gọi API mà không cần token (không cần axiosJWT)
        const res = await httpRequest.get('products/');

        if (res) {
            return res; // Trả về dữ liệu nếu có
        } else {
            return null; // Trả về null nếu không có dữ liệu
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Nếu có lỗi, trả về null
    }
};
export const getProductBySlug = async (name) => {
    try {
        // Gọi API mà không cần token (không cần axiosJWT)
        const res = await httpRequest.get(`productBySlug/${name}`);

        if (res) {
            return res; // Trả về dữ liệu nếu có
        } else {
            return null; // Trả về null nếu không có dữ liệu
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Nếu có lỗi, trả về null
    }
};
