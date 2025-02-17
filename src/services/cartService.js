import * as httpRequest from '../utils/httpRequest';
import { userLogin } from '../redux/Slice/signInSlice';

export const getCartByUserId = async (userId, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('cart/' + userId, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};

export const addProductToCart = async (quantity, productDetailId, cartId, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(
            'cart/addProduct',
            {
                quantity,
                productDetailId,
                cartId,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return error;
    }
};
export const deleteItemCart = async (id, accessToken, axiosJWT) => {
    try {
        const response = await axiosJWT.delete(`cartitem/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 200) {
            console.log('Xóa thành công!');
            return response.data; // Trả về dữ liệu để xử lý tiếp
        }
    } catch (error) {
        console.error('Lỗi khi xóa:', error.response?.data?.message || error.message);
    }
};
