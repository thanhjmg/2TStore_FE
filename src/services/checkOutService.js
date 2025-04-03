import * as httpRequest from '../utils/httpRequest';

export const checkOutMomo = async (totalPrice, orderId) => {
    try {
        const createMomo = await httpRequest.post('/momo', { amount: totalPrice, orderId: orderId });
        if (!!createMomo) {
            return createMomo;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
};

export const checkPayment = async (orderId) => {
    try {
        const check = await httpRequest.post('/check_payment', { orderId: orderId });
        if (!!check) {
            return check;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
};
