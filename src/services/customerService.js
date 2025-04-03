import * as httpRequest from '../utils/httpRequest';
import { userLogin } from '../redux/Slice/signInSlice';

export const getCustomerById = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('customer/' + id, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};

export const updateCustomerById = async (id, fullName, phone, address, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(
            'updateCustomer/' + id,
            { fullName, phone, address },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        );

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};
