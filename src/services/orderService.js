import * as httpRequest from '../utils/httpRequest';
export const addOrder = async (
    customerId,
    total_price,
    paymentMethod,
    shippingAddress,

    status,
    statusPayment,
    items,
    accessToken,
    axiosJWT,
) => {
    try {
        const add = await axiosJWT.post(
            'order/add',
            {
                customerId,
                total_price,
                paymentMethod,
                shippingAddress,
                status,
                statusPayment,
                items,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        if (add.status === 200) {
            return add.data;
        }
    } catch (error) {
        console.error('Lỗi khi thêm order', error.response?.data?.message || error.message);
    }
};
export const getOrderCustomerById = async (customerId, status, accessToken, axiosJWT) => {
    try {
        const getOrder = await axiosJWT.get(`orderCustomerById?customerId=${customerId}&status=${status}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (getOrder.status === 200) {
            return getOrder.data;
        }
    } catch (error) {
        console.error('Lỗi khi get order:', error.response?.data?.message || error.message);
        return null;
    }
};
export const deleteOrder = async (id, accessToken, axiosJWT) => {
    try {
        const delOrder = await axiosJWT.delete(`deleteOrder/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (delOrder.status === 200) {
            return delOrder.data;
        }
    } catch (error) {
        console.error('Lỗi khi xóa order:', error.response?.data?.message || error.message);
        return null;
    }
};
